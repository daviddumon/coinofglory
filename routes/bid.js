var https = require('https'),
    mongo = require('../mongo/mongofactory'),
    configuration = require('../configuration/configuration'),
    sanitize = require('validator').sanitize;


exports.index = function (req, res) {
    res.render('bid', {});
};

exports.creation = function (req, res) {
    var glory = { imageUrl : "http://funnysz.com/wp-content/uploads/2010/11/Lolcat_terrorist.jpg", link : "http://www.feelhub.com<script>" };
    glory.link = sanitize(glory.link).xss();

    mongo.execute(function(err, db) {
        db.collection('glory', function(err, collection) {
            collection.insert(glory, {safe:true}, function(err, result) {
                db.close();
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    newInvoice(0.005, glory._id, res);
                    res.send("OK");
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
        "notificationURL": "https://riotous-refuge-9554.herokuapp.com/bitpay-notifications?v=" + configuration.bitPayNotificationParameter,
        "fullNotifications": true,
        "redirectURL": "http://www.coinofglory.com"};

    var options = {
        host: 'bitpay.com',
        port: 443,
        path: '/api/invoice/',
        method: 'POST',
        auth: 'eE5qBrTa8VPXSr2yGmlDX40FvfxRhmU53ECHfxCrhM:',
        agent: false
    };

    var req = https.request(options, function (res) {
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
            response.render('bid-ok', {"url": obj.url});
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