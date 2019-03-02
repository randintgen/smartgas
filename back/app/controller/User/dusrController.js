'use strict';

const jwt = require('jsonwebtoken');
const kickout = require('../../model/User/logoutusr.js');
var remove = require('../../model/User/delusr.js');
const redis = require('redis');

exports.delete_a_user = function(req, res) {

	var nogo = 0 ;
	var error ;

	if(req.query.format=="xml") { 
		res.status(400).json({"success":false,"message":"XML"});
		return;
	}
	else if( !( req.body.psswd ) ) { 
		res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		return;
	}
	
	else {	

		let token = req.headers['x-observatory-auth'];
		if(token) {

	  		if (token.startsWith('Bearer ')) {
    				// Remove Bearer from string
    				token = token.slice(7, token.length);
  			}

			jwt.verify(token, 'top_secret', (err, decoded) => {

      				if (err) res.status(403).json({"success":false,"message":"Authentication failed !"});

      				else {

					var client = redis.createClient();

					client.get('blacklist:'+decoded.user.jwtid, function(error, res2) {

  						if (error || res2!=null) { 
							client.quit(redis.print);
							res.status(403).json({"success":false,"message":"Authentication failed !"});
						
						}

						else {
							client.quit(redis.print);

							remove(decoded.user._id , req.body.psswd , function (err,usr) {

		    						if (err) res.status(404).json(usr);
								else {
									if(usr.success==true) { 
										res.json(usr);
										if(usr.message!='Invalid password !') {
											kickout(decoded,token,function(error2,result2) {
												if(!error2) console.log("To delete user is blacklisted!");
											});
										}
									}
									else res.status(400).json(usr);
								}

	  						});
						}
					});
				
				}



    			});
		}
		else res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});


	}

};

