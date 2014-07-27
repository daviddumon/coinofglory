var mongo = require('../mongo/mongofactory'),
    https = require('https'),
    configuration = require('../configuration/configuration'),
    sanitize = require('validator').sanitize;

exports.lastPaid = function (callback, glory_index) {
    mongo.execute(function (err, db) {
        db.collection('glory', function (err, collection) {
            collection.find({paidDate: { $exists: true }}, {sort: [
                ['paidDate', 'desc']
            ]}).skip(glory_index).nextObject(callback);
        });
    });
}

exports.allPaidGlories = function (callback) {
    mongo.execute(function (err, db) {
        db.collection('glory', function (err, collection) {
            collection.find({paidDate: { $exists: true }}, {sort: [
                ['paidDate', 'desc']
            ]}).toArray(callback);
        });
    });
}

exports.add = function (s3Key, siteUrl, res) {
    var glory = { imageUrl: configuration.amazon.s3HttpPrefix + s3Key, link: sanitize(siteUrl).xss() };
    mongo.execute(function (err, db) {
        db.collection('glory', function (err, collection) {
            collection.insert(glory, {safe: true}, function (err) {
                db.close();
                if (err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    newInvoice(0.0005, glory._id, res);
                }
            });
        });
    });
}

function newInvoice(price, gloryId, response) {
    var newInvoice = {
        "price": price,
        "currency": "BTC",
        "posData": gloryId,
        "notificationURL": configuration.bitPay.invoiceParameters.notificationURL + "?v=" + configuration.bitPay.invoiceParameters.notificationParameter,
        "fullNotifications": configuration.bitPay.invoiceParameters.fullNotifications,
        "redirectURL": configuration.bitPay.invoiceParameters.redirectURL
    };

    var req = https.request(configuration.bitPay.invoiceOptions, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var obj;
            try {
                obj = JSON.parse(data);
            } catch (e) {
                obj = {error: {type: 'parsingError', message: 'Error parsing server response'}};
            }
            response.redirect('/bid-ok?url=' + obj.url);
        });
    });

    req.on('error', function (err) {
        console.error(err);
        response.render('index', {});
    });

    req.setHeader('Content-Type', 'application/json');
    var str = JSON.stringify(newInvoice);
    req.setHeader('Content-Length', str.length);
    req.end(str);
}
