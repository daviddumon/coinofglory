var mongo = require('../mongo/mongofactory'),
    glory = require('../glory/glory');

exports.index = function (req, res) {
    var glory_index = parseInt(req.params.index) || 0;
    glory.allPaidGlories(function (err, documents) {
        var glories = new Array();
        for (var index = 0; index < documents.length; index++) {
            glories.push({"index": index, "link": documents[index].link, "imageUrl": documents[index].imageUrl});
        }
        res.render('index', {glory: documents[0], glories: glories, past: glory_index + 1});
    });
};