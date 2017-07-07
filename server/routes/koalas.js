var express = require('express');
var router = express.Router();
var pg = require('pg');
console.log("hello");

var config = {
  database: 'antares',  //name of database
  host: 'localhost',  //where is your database
  port: 5432,  // port for the database
  max: 10, //how many connections at one time
  idleTimeoutMillis: 30000 //30 second time out
};
var pool = new pg.Pool(config);

router.get('/', function(req, res){
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET things from the db
      var queryText = 'SELECT * FROM "koalas"';
      // errorMakingQuery is a boolean, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', queryText);
          console.log('Error making query');

          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.send({koalas: result.rows});
        }
      });
    }
  });
});

router.post('/', function(req, res){
  console.log(req);
  var koala = req.body;
  console.log(koala);
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET things from the db
      var queryText = 'INSERT INTO koalas ("koala_name", "gender", "age", "ready_for_transfer", "notes")'+
      ' VALUES ($1,$2,$3,$4,$5);';
      // errorMakingQuery is a boolean, result is an object
      db.query(queryText, [koala.koala_name, koala.gender, koala.age, koala.ready_for_transfer, koala.notes], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          console.log(errorMakingQuery);
          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.sendStatus(200);
        }
      });
    }
  });
});

router.delete('/:id', function(req, res){
var id = req.params.id;
console.log('Delete', id);
  //error connecting is boolean, db is what we query against
  //done is a function that we can when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase){
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //we connected to the database!!!
      //Now we're going to GET things from the db
      var queryText = 'DELETE FROM "koalas" WHERE id = $1';
      // errorMakingQuery is a boolean, result is an object
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('Attempted to query with', queryText);
          console.log('Error making query');

          res.sendStatus(500);
        } else {
          // console.log(result);
          //send back the results
          res.sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
