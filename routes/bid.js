var https = require('https'),
    mongo = require('../mongo/mongofactory'),
    configuration = require('../configuration/configuration'),
    sanitize = require('validator').sanitize,
    express = require('express'),
    aws = require('aws-sdk');


exports.index = function (req, res) {
    res.render('bid', {});
};

exports.creation = function (req, res) {
    newGlory(req.files.image, req.body.protocol + '://' + req.body.url, res);
}

function newGlory(image, url, res) {
    // add image to S3
    /*aws.config.update({accessKeyId: configuration.amazon.accessKeyId, secretAccessKey: configuration.amazon.secretAccessKey});
    aws.config.update({region: 'us-east-1'});
    var s3 = new aws.S3();
    var data = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!'};
    s3.client.putObject(data).done(function(resp) {
        console.log("Successfully uploaded data to myBucket/myKey");
    });*/
    var s3Url = 'http://funnysz.com/wp-content/uploads/2010/11/Lolcat_terrorist.jpg';

    addGlory(s3Url, url, res);
}

function addGlory(s3Url, siteUrl, res) {
    var glory = { imageUrl : s3Url, link : sanitize(siteUrl).xss() };
    mongo.execute(function(err, db) {
        db.collection('glory', function(err, collection) {
            collection.insert(glory, {safe:true}, function(err) {
                db.close();
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    //newInvoice(0.005, glory._id, res);
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
        "notificationURL": "https://riotous-refuge-9554.herokuapp.com/bitpay-notifications?v=" + configuration.bitPay.notificationParameter,
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