var mongo = require('mongodb'),
    configuration = require('../configuration/configuration');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    MongoClient = require('mongodb').MongoClient;

exports.execute = function(traitement) {
    MongoClient.connect("mongodb://" + configuration.mongodb, traitement);
};