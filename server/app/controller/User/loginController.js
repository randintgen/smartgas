'use strict';

var login = require('../../model/User/loginusr.js');

exports.login_as_user = function(req, res) {

  	//console.log(!req.body.psswd);
	//console.log(!req.body.username);

	var error;
	var nogo = 0;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else {
	
		if(! (req.body.psswd && req.body.username) ) {
		
			error = "Please complete the mandatory fields ! " ;
			nogo = 1;
		}

		if(req.body.username) {

			if (req.body.username.length > 255 ) {
	
				error = " Variable username has exceeded maximum length ! " ;
				nogo = 1;
			}
		}

		if ( nogo ) res.status(400).json({"success":false,"message":error});

		else {

			login(req.body.username , req.body.psswd , function (err,usr) {

				//console.log(err);
				//console.log(usr);
   	
    				if (err) res.status(404).json(usr);
				else {
					if(usr.success==true) res.json(usr);
					else res.status(403).json(usr);
				}
  			});
		}
	}

};

