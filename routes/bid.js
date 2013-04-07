var https = require('https'),
    mongo = require('../mongo/mongofactory'),
    configuration = require('../configuration/configuration'),
    sanitize = require('validator').sanitize,
    express = require('express'),
    AWS = require('aws-sdk'),
    fs = require('fs'),
    uuid = require('node-uuid');


exports.index = function (req, res) {
    res.render('bid', {});
};

exports.creation = function (req, res) {
    newGlory(req.files.image, req.body.protocol + '://' + req.body.url, res);
}

function newGlory(image, url, res) {
    AWS.config.update({accessKeyId: configuration.amazon.accessKeyId, secretAccessKey: configuration.amazon.secretAccessKey, region: 'us-east-1'});
    var s3Key = uuid.v4();
    fs.readFile(image.path, function (err, data) {
        var options = {Bucket: configuration.amazon.s3Bucket, Key: s3Key, Body: data, ACL:'public-read', ContentType : image.type};
        var s3 = new AWS.S3();
        s3.client.putObject(options, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                addGlory(s3Key, url, res);
            }
        });
    });
}

function addGlory(s3Key, siteUrl, res) {
    var glory = { imageUrl : configuration.amazon.s3HttpPrefix + s3Key, link : sanitize(siteUrl).xss() };
    mongo.execute(function(err, db) {
        db.collection('glory', function(err, collection) {
            collection.insert(glory, {safe:true}, function(err) {
                db.close();
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    newInvoice(0.005, glory._id, res);
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