var ObjectID = require('mongodb').ObjectID;

ProductProvider = function(teen_xoneDb){

  teen_xoneDb.prototype.getProductsCollection = function(callback){
    this.db.collection('products', function(error, product_collection) {
      if( error ) {
        callback(error);
      }else{
       callback(null, product_collection);
     }
    });
  };

  teen_xoneDb.prototype.getProductList = function(callback){
    this.getProductsCollection(function(error, product_collection) {
      if( error ){
        callback(error);
      }else{
        product_collection.find().toArray(function(error, results) {
          if( error ){
            callback(error);
          }else{
            callback(null, results);
          }
        });
      }
    });
  };

  teen_xoneDb.prototype.getProduct = function(id, callback){
    this.getProductsCollection(function(error, product_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        product_collection.find({_id: ObjectID(id) }).toArray(function(error, results) {
          if( error ){
            callback(error);
          }else{
            callback(null, results[0]);
          }
        });
      }
    });
  };

  teen_xoneDb.prototype.addProduct = function(newProduct, callback){
    this.getProductsCollection(function(error, product_collection) {
      product_collection.save(newProduct, function(err, record){
        if(err){
          callback(error);
        }else{
          callback(null, record);
        }
      });
    });
  };

  teen_xoneDb.prototype.updateProduct = function(id, newProduct, callback){
    this.getProductsCollection(function(error, product_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        product_collection.find({_id: ObjectID(id) }).toArray(function(error, results) {
          if( error ){
            callback(error);
          }else{
            product_collection.update(results[0], newProduct, function(error, result){
              if(error){
                callback(error);
              }else{
                callback(null, result);
              }
            });
          }
        });
      }
    });
  };

  teen_xoneDb.prototype.deleteProduct = function(id, callback){
    this.getProductsCollection(function(error, product_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        product_collection.remove({_id: ObjectID(id) }, function(error) {
          if( error ){
            callback(error);
          }else{
            callback(null);
          }
        });
      }
    });
  };
};

exports.ProductProvider = ProductProvider;