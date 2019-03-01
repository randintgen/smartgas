
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
		query = " INSERT INTO users ( mail,username,psswd,nposts,reputation,admin,ipath ) VALUES  ('lkanav@yahoo.com','fnp','"+hash+"',0,0,1,'/home/fnp'),			('pcolaras23@yahoo.com','pcolaras23','"+hash+"',0,0,1,'/home/fnp'),('alexkaf@yahoo.com','alexkaf','"+hash+"',0,0,1,'/home/fnp'),('manzar@yahoo.com','manzar','"+hash+"',0,0,1,'/home/fnp'),('caruso@yahoo.com','caruso','"+hash+"',0,0,1,'/home/fnp'),('alexakis@yahoo.com','alexakis','"+hash+"',0,0,1,'/home/fnp'),('notadmin1@yahoo.com','notadmin1','"+hash+"',0,0,0,'/home/fnp'),('notadmin2@yahoo.com','notadmin2','"+hash+"',0,0,0,'/home/fnp'),('notadmin3@yahoo.com','notadmin3','"+hash+"',0,0,0,'/home/fnp'),('notadmin4@yahoo.com','notadmin4','"+hash+"',0,0,0,'/home/fnp'),('peiramatozoo@yahoo.com','peiramatozoo','"+hash+"',0,0,0,'/home/fnp'); "

		mc.query(query)
		console.log("Database Initialized ! ")
	}
});


// REDIS Database

// Simply pass the port that you want a Redis server to listen on.
const server = new RedisServer({
    port: 6379,
    bin: "/home/manzar/Desktop/examino9/texnologia logismikou/redis-stable/src/redis-server"    // change path if necessary - needs to show to redis-server
});

server.open((err) => {
  if (err === null) {
    // You may now connect a client to the Redis
    // server bound to port 6379.
    console.log("Redis Server started");
  }
});

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


//const myserver = app.listen(port);

https.createServer(options, app).listen(port);

console.log('API server started on: ' + port);

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


var routes = require('./app/routes/appRoutes.js'); //importing route
routes(app); //register the route

process.on('SIGTERM', () => {
  console.info('\nSIGTERM signal received. Closing redis-server connection!\nAll data in redis will be lost.');
  server.close((err) => {
    // The associated Redis server is now closed.
  });
  process.exit(0);
});

process.on('SIGINT', () => {
  console.info('\nSIGINT signal received. Closing redis-server connection!\nAll data in redis will be lost.');
  server.close((err) => {
    // The associated Redis server is now closed.
  });
  process.exit(0);
});


module.exports = {
	app,
	mc
}
