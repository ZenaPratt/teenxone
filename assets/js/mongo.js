var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var ProductProvider = require('./productProvider').ProductProvider;
var ServiceProvider = require('./serviceProvider').ServiceProvider;

teen_xoneDb = function(host, port) {
  this.db= new Db('teen_xone-db', new Server(host, port, {w: 1, auto_reconnect: true}, {}));
  this.db.open(function(err, db){
    if(err){
      console.log(err);
    }
  });
};

teen_xoneDb.prototype.addProviders = function(){
  ProductProvider = new ProductProvider(teen_xoneDb);
  ServiceProvider = new ServiceProvider(teen_xoneDb);
};

exports.teen_xoneDb = teen_xoneDb;