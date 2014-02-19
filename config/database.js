var local_uri = 'mongodb://localhost/test'; 
var database_uri = process.env.MONGOLAB_URI || local_uri; 
console.log(database_uri);
console.log(process.env.MONGOLAB_URI);
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect(database_uri, function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});