// Define constants

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8765;


const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const redis = require('redis');
const fs = require('fs')
const https = require('https');
const RedisServer = require('redis-server');
const initialize = require('./init.js');

// read certificates

const key = fs.readFileSync('./certificates/server.key');
const cert = fs.readFileSync( './certificates/motherhackers.cert' );

// https server options

const options = {
key: key,
cert: cert
};


// MYSQL Database

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kwdikosmysql',
    database: 'crowd'
});

// connect to MYSQL
mc.connect();

// INITIALIZE users if required

mc.query("SELECT 1 FROM users WHERE username = ? LIMIT 1" , "fnp" , function (erru,resu) {

    if (resu[0]) {

        console.log("Database already initialized !");
    }
    else {

        psswd = 'kodikos'

        let hash = bcrypt.hashSync(psswd, 10)
        query = " INSERT INTO users ( mail,username,psswd,nposts,reputation,admin,ipath,flag,hashid) VALUES  ('lkanav@yahoo.com','fnp','"+hash+"',0,0,1,'/home/fnp',1,1),('pcolaras23@yahoo.com','pcolaras23','"+hash+"',0,0,1,'/home/fnp',1,1),('alexkaf@yahoo.com','alexkaf','"+hash+"',0,0,1,'/home/fnp',1,1),('manzar@yahoo.com','manzar','"+hash+"',0,0,1,'/home/fnp',1,1),('caruso@yahoo.com','caruso','"+hash+"',0,0,1,'/home/fnp',1,1),('alexakis@yahoo.com','alexakis','"+hash+"',0,0,1,'/home/fnp',1,1),('notadmin1@yahoo.com','notadmin1','"+hash+"',0,0,0,'/home/fnp',1,1),('notadmin2@yahoo.com','notadmin2','"+hash+"',0,0,0,'/home/fnp',1,1),('notadmin3@yahoo.com','notadmin3','"+hash+"',0,0,0,'/home/fnp',1,1),('notadmin4@yahoo.com','notadmin4','"+hash+"',0,0,0,'/home/fnp',1,1),('peiramatozoo@yahoo.com','peiramatozoo','"+hash+"',0,0,0,'/home/fnp',1,1); "

        mc.query(query, function (err1, res1) {
            if (err1) console.log("Wrong HERE!!! " + err1);
            else {
                mc.query(initialize(), function (err2, res2) {
                    if (err2) console.log("WRONG THERE" + err2);
                    else {
                        console.log("Database Initialized ! ")
                    }
                });
            }
        });
    }

});


// REDIS Database

// Simply pass the port that you want a Redis server to listen on.
/*

const server = new RedisServer({
    conf: './redis.conf',
    port: 6379,
    bin: "redis-server"    // change path if necessary - needs to show to redis-server


});

server.open((err) => {
  if (err === null) {
    // You may now connect a client to the Redis
    // server bound to port 6379.
    console.log("Redis Server started");
  }
});

*/

var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function(err){
    console.log('Something went wrong ', err)
});

client.get('counter', function(error, result) {

    if (error) console.log(error);

    else {

        if(result==null) {

            client.set('counter',0, function(e1,r1) {

                if(e1) console.log(e1);
                client.quit(redis.print);
            });
        }

        else {
            console.log('Counter is ->', result)
            client.quit(redis.print);
        }
    }
});

/*
function rawBodySaver (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
    console.log(req)
  }
}

*/
//const myserver = app.listen(port);

https.createServer(options, app).listen(port);

console.log('API server started on: ' + port);

app.use(cors());
app.options('*', cors());

//app.use(bodyParser.text({defaultCharset: 'utf-8'}));
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.use(
  bodyParser.raw({ type : 'application/x-www-form-urlencoded' }),
  function(req, res, next) {
    try {
      req.body = JSON.parse(req.body)
    } catch(e) {
      req.body = require('qs').parse(req.body.toString());
    }
    next();
  }
);

*/
app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


var routes = require('./app/routes/appRoutes.js'); //importing route
routes(app); //register the route

/*

process.on('SIGTERM', () => {
  console.info('\nSIGTERM signal received. Closing redis-server connection!\nSaving data in redis.');
  server.close((err) => {
    // The associated Redis server is now closed.
  });
  process.exit(0);
});

process.on('SIGINT', () => {
  console.info('\nSIGINT signal received. Closing redis-server connection!\nSaving data in redis.');
  server.close((err) => {
    // The associated Redis server is now closed.
  });
  process.exit(0);
});

*/
module.exports = {
    app,
    mc
}
