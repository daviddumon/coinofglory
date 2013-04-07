var AWS = require('aws-sdk'),
    configuration = require('../configuration/configuration'),
    fs = require('fs');

exports.uploadImage = function (image, s3Key, callback) {
    AWS.config.update({accessKeyId: configuration.amazon.accessKeyId, secretAccessKey: configuration.amazon.secretAccessKey, region: 'us-east-1'});
    fs.readFile(image.path, function (err, data) {
        var options = {Bucket: configuration.amazon.s3Bucket, Key: s3Key, Body: data, ACL:'public-read', ContentType : image.type, StorageClass : 'REDUCED_REDUNDANCY'};
        var s3 = new AWS.S3();
        s3.client.putObject(options, function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                callback();
            }
        });
    });
}
