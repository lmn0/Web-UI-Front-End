
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient=require('mongodb').MongoClient;

var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', function (req, res) {
    console.log("hehe");
  res.send('Hello World!');
});
app.post('/',function(req,res){
    var obj = {};
    console.log('body: ' + JSON.stringify(req.body));
 console.log("hey");


MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');
    var user=req.body;

    // Insert some users
    collection.insert(user, function (err, result) {
      if (err) {
        console.log(err);
      } else {

        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);

 res.sendStatus(200);
      }
      //Close connection
      db.close();
    });
  }
});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
