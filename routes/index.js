var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    MongoClient = require('mongodb').MongoClient;


exports.index = function (req, res) {
    MongoClient.connect("mongodb://coinofglory:bG%)(Ynt7->h[*6@dharma.mongohq.com:10099/coinofglory", function (err, db) {
        db.collection('glory', function (err, collection) {
            collection.find({}, {sort:[['date', 'desc']]}).nextObject(function(err, doc) {
                console.log(doc);
                res.render('index', {glory : doc});
            });
        });
    });
};