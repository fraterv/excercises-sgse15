var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo = 'mongodb://localhost:27017/praktikum';
var collectionName = "zips";

module.exports = {
  Mongo : (function() {
             function Mongo() {
               this.db = null
             }

             function connect (callback) {
               if (!this.db) {
                 MongoClient.connect(mongo, function(err, db) {
                   assert.equal(null, err)
                   this.db = db
                   callback(this.db)
                 });
               }
               else {
                 callback(this.db)
               }
             }

             Mongo.prototype.find = function(collection, query, callback) {
               connect(function(db) {
                 console.log("Connecting to " + collection)
                 db.collection(collection, function(err, collection) {
                   assert.equal(null, err);
                   collection.find(query).toArray(function(err, result) {
                     assert.equal(null, err);
                     callback(result);
                   })
                 })
               })
             }

             Mongo.prototype.close = function() {
               if (this.db) {
                 this.db.close()
               }
               this.db = null;
             }
             return Mongo
           })()
}
