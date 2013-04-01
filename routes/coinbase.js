var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    MongoClient = require('mongodb').MongoClient;

//var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
//var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;


exports.add = function(req, res) {
    var paiement = req.body;
    MongoClient.connect("mongodb://coinofglory:bG%)(Ynt7->h[*6@dharma.mongohq.com:10099/coinofglory", function(err, db) {
        db.collection('paiement', function(err, collection) {
            collection.insert(paiement, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success:');
                }
                db.close();
            });
        });
    });
}