'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');
const nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "motherhackersteam",
        pass: "kodikos1"
    }
});

var rand,mailOptions,host,link;



//Task object constructor

var User = function(user) {

	this.mail = user.mail;
	this.username = user.username;
	this.psswd = user.psswd;
	this.admin = user.admin;
	this.ipath = user.ipath;
	this.flag = user.flag;
	this.hashid =0;

};

User.createusr = function createUser(newUser, result) {    

	var query = "SELECT mail,username FROM users WHERE username='"+newUser.username+"' OR mail='"+newUser.mail+"' LIMIT 2 ;";

	sql.query(query , function (erru,resu) {

		if (resu.length==1) {

			if(resu[0].username==newUser.username && resu[0].mail==newUser.mail) {
				console.log("Email and username are already in use!");
				result(null,{"success":false,"message":"Email and username are already in use."});
			}

			else if(resu[0].username==newUser.username){
				console.log("Username already exists!");
				result(null,{"success":false,"message":"Username is already in use."});
			}

			else {
				console.log("Email already exists!");
				result(null,{"success":false,"message":"Email is already in use."});
			}
		}

		else if (resu.length==2) {
			console.log("Email and username are already in use!");
			result(null,{"success":false,"message":"Email and username are already in use."});
		}

		else {


			let hash = bcrypt.hashSync(newUser.psswd, 10);

			newUser.psswd = hash ;
			rand = Math.floor((Math.random()*10000000)+54);
			newUser.hashid = rand;

	        	sql.query("INSERT INTO users set ?", newUser, function (err, res) {
               	 
	                	if(err) {
	                    		console.log("error: ", err);
	                    		result(true,{"success":false,"message":"An error occured"});
	                	}

	                	else {  

					if(!newUser.flag) {
					
						link="https://localhost:4200/verify?id="+rand+"&userid="+res.insertId;

						mailOptions = {
								to : newUser.mail,
								subject : "Please confirm your Email account",
								html : "Hello "+newUser.username+",<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
						}

						//console.log(mailOptions);

						smtpTransport.sendMail(mailOptions, function(error, response) {

							if(error) {
										console.log(error);
										//res.end("error");
							}

							else {
										console.log("Mail sent to " +newUser.username+" !");
										//res.end("sent");
							}

						});

					}

	                    		console.log("New user created , userid -->  " + res.insertId );
	                    		result(null, {"success":true,"message":"Welcome, " +newUser.username+" !"});
	                	}

	            	}); 

		} 


	});

         
};


module.exports= User;
