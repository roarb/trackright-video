/**
 * Created by rhoeh on 4/8/2016.
 */
//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var builder = require('./builder');
var passport = require('passport');

// parse application/json
app.use(bodyParser.json());

// allow for css static files
app.use(express.static(__dirname + '/public'));

// couchbase connection setup
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
var bucket = cluster.openBucket('video');


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// START examples
// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    //console.log("Got a GET request for the homepage");
    //res.send(builder.init());
    res.render('index.ejs', {
        //title: 'My Site',
        //nav: ['Home','About','Contact']
    });
});

app.get('/1/upsertvideo', function (req, res) {
    var obj = req.query;
    bucket.upsert(obj.item.media_type+'-'+obj.item.id, obj.item, function(err, result) {
        if (err) throw err;
    });
    res.end();
});

app.get('/1/upsertepisodes', function (req, res) {
    var obj = req.query;
    bucket.upsert('tv-'+obj.id+'-s'+obj.season, obj.episodes, function(err, result) {
         if (err) throw err;
     });

    res.end();
});

app.get('/1/getvideo', function (req, res) {
    var obj = req.query;
    var rtn = '';
    bucket.get(obj.media+'-'+obj.id, function(err, result) {
        if (err) throw err;
        rtn = result.value;
        res.send(rtn);
    });
    //res.end(rtn);
});

// start login & authentication with passport.
app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        console.log('/login hit');
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
    });

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
