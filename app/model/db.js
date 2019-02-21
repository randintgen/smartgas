'user strict';

var mysql = require('mysql');

//local mysql db connection

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'kwdikosmysql',
	database : 'crowd',
	charset: "utf8_general_ci"
});

connection.connect(function(err) {

    	if (err) throw err;

});


module.exports = connection;
