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


	var flagu=0;
	var flagm=0;
	
	sql.query("SELECT 1 FROM users WHERE username = ? LIMIT 1" , newUser.username , function (erru,resu) {

		if (resu[0]) {
			
			console.log("Username already exists!");
			flagu=1;
		}

		sql.query("SELECT 1 FROM users WHERE mail = ? LIMIT 1" , newUser.mail , function (errm,resm) {
	
			if (resm[0]) {

				console.log("Email already exists!");
				flagm=1;
			}
		

			//console.log("flagu = " ,flagu);
			//console.log("flagm = " ,flagm);

			if( !( flagm || flagu ) ) {

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




			else {

				if( (flagu+flagm) == 2 ) result(true,{"success":false,"message":"Email and username are already in use."});

	
				else {

					if(flagu) result(true,{"success":false,"message":"Username is already in use."});

					if(flagm) result(true,{"success":false,"message":"Email is already in use."});

				}
			}
		});

	});

         
};


module.exports= User;
