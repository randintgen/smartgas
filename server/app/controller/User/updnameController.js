'use strict';

var updatename = require('../../model/User/updusername.js');
var authenticate = require('../../auth/auth.js')

exports.update_name_user = function(req, res) {

	var error ;
	var nogo = 0 ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else {

		if( ! (req.body.username && req.params.username ) )  {	

			error = "Please fill all the mandatory fields ! ";
			nogo = 1;
		}

		if(req.body.username) {

			if ( req.body.username.length > 255 ) { 

				error = " Variable new username has exceeded maximum length ! " ;
				nogo = 1 ;
			}
		}

		if(req.params.username) {

			if ( req.params.username.length > 255 ) { 

				error = " Variable username has exceeded maximum length ! " ;
				nogo = 1 ;
			}
		}

		if ( nogo ) res.status(400).json({"success":false,"message":error}) ;

		else {

			authenticate(req,function(error,result,usrid) {

				if(error) {
					res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
				}

				else {

					if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
					else {
						updatename(req.body.username ,usrid, function (err,usr) {
   	
    							if (err) res.status(404).json(usr);
							else {
								if(usr.success==true) res.json(usr);
								else res.status(400).json(usr);
							}

  						});
					}
		
				}

			});
		}
	}

};
