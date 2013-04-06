var mongo = require('../mongo/mongofactory');

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