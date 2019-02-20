'use strict';

var remove = require('../../model/User/delusr.js');

exports.delete_a_user = function(req, res) {

	var nogo = 0 ;
	var error ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else {

		if( !( req.body.psswd && req.params.username ) ) {
 
			error = "Please fill all the mandatory fields ! " ;
			nogo = 1 ;
		}

		if(req.params.username) {

			if( req.params.username.length > 255 ) { 

				error = " Variable username has exceeded maximum length ! " ;
				nogo = 1 ;
			}
		}

		if ( nogo ) res.status(400).json({"success":false,"message":error});
	
		else {	
	
			remove(req.params.username , req.body.psswd , function (err,usr) {

    				if (err) res.status(404).json(usr);
				else {
					if(usr.success==true) res.json(usr);
					else res.status(400).json(usr);
				}

  			});

		}
	}
};

