var mongo = require('../mongo/mongofactory'),
    glory = require('../glory/glory');

exports.index = function (req, res) {
    var glory_index = parseInt(req.params.index) || 0;
    glory.lastPaid(function (err, doc) {
        res.render('index', {glory: doc});
    }, glory_index);
};