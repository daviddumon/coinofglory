var mongo = require('../mongo/mongofactory');



exports.index = function (req, res) {
    mongo.execute(function (err, db) {
        db.collection('glory', function (err, collection) {
            collection.find({}, {sort:[['date', 'desc']]}).nextObject(function(err, doc) {
                console.log(doc);
                res.render('index', {glory : doc});
            });
        });
    });
};