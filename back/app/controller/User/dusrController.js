'use strict';

var remove = require('../../model/User/delusr.js');

exports.delete_a_user = function(req, res) {

	var nogo = 0 ;
	var error ;
	console.log(req.headers);
	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});
	else if( !( req.body.psswd && req.params.username ) ) { 
		res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
	}
	else if( req.params.username.length > 255 ) { 
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
	}
	
	else {	
	
		remove(req.params.username , req.body.psswd , function (err,usr) {

    			if (err) res.status(404).json(usr);
			else {
				if(usr.success==true) res.json(usr);
				else res.status(400).json(usr);
			}

  		});

	}
};

