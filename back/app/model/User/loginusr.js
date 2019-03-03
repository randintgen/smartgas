'user strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('../db.js');
const redis = require('redis');


login = function(username,pswd,flag2,result) {

	var query = "SELECT psswd,userid,admin,flag FROM users WHERE "  ;
	var counter=0;
	if(!flag2) query +="username='"+username+"' LIMIT 1 ;";
	else query +="mail='"+username+"' LIMIT 1 ;";

	sql.query(query,function(err1,resp) {
		
		//console.log(resp[0]);

		if(!resp[0]) result(true,{"success":false,"message":"Invalid username!"});

		else {
			// if user profile is active
			if(resp[0].flag==1) {
				
				// if user password is correct
				if(bcrypt.compareSync(pswd, resp[0].psswd)) {

					console.log("User " + username + " logged in !");

					var client = redis.createClient();

					client.on('error', function(err){
	  					console.log('Something went wrong ', err)
					});

					//client.get('counter', function(error, res2) {

	  					//if (error) console.log(error);

						//counter = res2;
					client.incr('counter', function(er3,res3) {

						if(er3) console.log(er3);
						//console.log("The result is "+res3+" !");
						counter = res3;
						console.log("Counter is "+counter+" !");
						//console.log("Admin "+resp[0].admin );
						client.quit(redis.print);
						const body = {_id :resp[0].userid,jwtid:counter,admin:resp[0].admin};
						const token = jwt.sign({user : body},'top_secret',{expiresIn: '2h'});

						result(null,{'success': true,'message':"User "+username+" succesfully logged in !",'token':token});
					});
					//});


				}
			

				else result(null,{'success':false,'message':"Invalid password !"});
			}
			
			else result(null,{'success':false,'message':'Please authenticate your email address !'});
		}
	});
};

module.exports= login;
