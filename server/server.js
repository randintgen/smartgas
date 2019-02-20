const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8765;


const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
//const errorHandler = require('errorhandler');

// connection configurations

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kwdikosmysql',
    database: 'crowd'
});

// connect to database
mc.connect();

mc.query("SELECT 1 FROM users WHERE username = ? LIMIT 1" , "fnp" , function (erru,resu) {

	if (resu[0]) {
			
		console.log("Database already initialized !");
	}
	else {

		psswd = 'kodikos'

		let hash = bcrypt.hashSync(psswd, 10)
		query = " INSERT INTO users ( mail,username,psswd,nposts,reputation,admin,ipath ) VALUES  ('lkanav@yahoo.com','fnp','"+hash+"',0,0,1,'/home/fnp'),			('pcolaras23@yahoo.com','pcolaras23','"+hash+"',0,0,1,'/home/fnp'),('alexkaf@yahoo.com','alexkaf','"+hash+"',0,0,1,'/home/fnp'),('manzar@yahoo.com','manzar','"+hash+"',0,0,1,'/home/fnp'),('caruso@yahoo.com','caruso','"+hash+"',0,0,1,'/home/fnp'),('alexakis@yahoo.com','alexakis','"+hash+"',0,0,1,'/home/fnp'); "

		mc.query(query)
		console.log("Database Initialized ! ")
	}
});

app.listen(port);

console.log('API server started on: ' + port);

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


var routes = require('./app/routes/appRoutes.js'); //importing route
routes(app); //register the route


