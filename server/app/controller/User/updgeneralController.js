'use strict';

var updategen = require('../../model/User/updgeneral.js');
var authenticate = require('../../auth/auth.js')

exports.update_gen_user = function(req, res) {

	var nogo = 0;
	var error ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else {

		if( !( req.body.ipath ) ) {
	
			error = "Please fill all the mandatory fields ! " ;
			nogo = 1;
		}


		if(req.body.ipath) {

			if ( req.body.ipath.length > 255 ) {

				error = " Variable username has exceeded maximum length ! " ;
				nogo = 1 ;

			}
		}

		if ( nogo ) {

			//res.send(400);
			res.status(400).json({"success":false,"message":error}) ;
		}

		else {

			authenticate(req,function(error,result,usrid) {

				if(error) {
					res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
				}

				else {
					if(!result) {

						res.status(403).json({"success":false,"message":"Authentication failed !"});
					}

					else{

						updategen(req.body ,usrid, function (err,usr) {
   	
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
