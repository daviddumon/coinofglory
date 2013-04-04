var mongo = require('../mongo/mongofactory');



//var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
//var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;


exports.add = function(req, res) {
    var paiement = req.body;
    mongo.execute(function(err, db) {
        db.collection('paiement', function(err, collection) {
            collection.insert(paiement, {safe:true}, function(err, result) {
                db.close();
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success:');
                    res.send("OK");
                }
            });
        });
    });
}