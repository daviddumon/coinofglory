var mongo = require('../mongo/mongofactory'),
    glory = require('../glory/glory');

exports.index = function (req, res) {
    glory.lastPaid(function (err, doc) {
        res.render('index', {glory: doc});
    });
};