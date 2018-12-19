'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');



//Task object constructor

var User = function(user) {

	//this.userid = user.userid;

	this.mail = user.mail;
	this.username = user.username;
	this.psswd = user.psswd;

	//this.nposts = user.nposts;
	//this.location = user.location;
	//this.reputation = user.reputation;

	this.admin = user.admin;
	this.ipath = user.ipath;

};

User.createusr = function createUser(newUser, result) {    

	var query = "SELECT mail,username FROM users WHERE username='"+newUser.username+"' OR mail='"+newUser.mail+"' LIMIT 2 ;";

	sql.query(query , function (erru,resu) {

		if (resu.length==1) {

			if(resu[0].username==newUser.username && resu[0].mail==newUser.mail) {
				console.log("Email and username are already in use!");
				result(true,{"success":false,"message":"Email and username are already in use."});
			}

			else if(resu[0].username==newUser.username){
				console.log("Username already exists!");
				result(true,{"success":false,"message":"Username is already in use."});
			}

			else {
				console.log("Email already exists!");
				result(true,{"success":false,"message":"Email is already in use."});
			}
		}

		else if (resu.length==2) {
			console.log("Email and username are already in use!");
			result(true,{"success":false,"message":"Email and username are already in use."});
		}

		else {


			let hash = bcrypt.hashSync(newUser.psswd, 10);

			newUser.psswd = hash ;
	
	        	sql.query("INSERT INTO users set ?", newUser, function (err, res) {
               	 
	                	if(err) {
	                    		console.log("error: ", err);
	                    		result(err,{"success":false,"message":"An error occured"});
	                	}

	                	else {
	                    		console.log("New user created , userid -->  " + res.insertId );
	                    		result(null, {"success":true,"message":"Welcome, " +newUser.username+" !"});
	                	}

	            	}); 

		} 


	});

         
};


module.exports= User;
