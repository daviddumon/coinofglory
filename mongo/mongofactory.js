var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    MongoClient = require('mongodb').MongoClient;

var mongodbConnexion = process.env['MONGODB_CONNEXION'] != null ? process.env['MONGODB_CONNEXION'] : 'localhost:27017/coinofglory';


exports.execute = function(traitement) {
    MongoClient.connect("mongodb://" + mongodbConnexion, traitement);
};