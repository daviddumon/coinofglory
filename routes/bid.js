var uuid = require('node-uuid'),
    amazon = require('../amazon/amazon'),
    glory = require('../glory/glory');


exports.index = function (req, res) {
    res.render('bid', {});
};

exports.creation = function (req, res) {
    newGlory(req.files.image, req.body.protocol + '://' + req.body.url, res);
}

function newGlory(image, url, res) {
    var s3Key = uuid.v4();
    amazon.uploadImage(image, s3Key, glory.add(s3Key, url, res));
}