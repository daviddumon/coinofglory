var mongo = require('../mongo/mongofactory'),
    ObjectID = require('mongodb').ObjectID,
    configuration = require('../configuration/configuration');


exports.add = function(req, res) {
    if (!(req.query["v"] == configuration.bitPay.invoiceParameters.notificationParameter)) {
        res.send(403);
    } else {
        newNotification(req.body, res);
    }
}

function newNotification(paiement, res) {
    var gloryId = paiement.posData;
    if (paiement.status == configuration.bitPay.status) {
        mongo.execute(function(err, db) {
            db.collection('glory', function(err, collection) {
                collection.update({_id: new ObjectID(gloryId)}, {$set: {paidDate: new Date()}}, {safe:true},
                    function(err) {
                        db.close();
                        if (err) {
                            res.send({'error':'An error has occurred'});
                        }
                        else {
                            insertPaiement(paiement, res);
                        }
                    });
            });
        });
    } else {
        insertPaiement(paiement, res);
    }
}

function insertPaiement(paiement, res) {
    mongo.execute(function(err, db) {
        db.collection('paiement', function(err, collection) {
            collection.insert(paiement, {safe:true}, function(err, result) {
                db.close();
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send("OK");
                }
            });
        });
    });
}