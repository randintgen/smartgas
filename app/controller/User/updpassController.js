'use strict';

var updatepass = require('../../model/User/updpass.js');

exports.update_pass_user = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else if(!(req.body.psswd && req.params.username && req.body.newpsswd)) {
		res.status(400).json({"success":false,"message":"Please fill all the mandatory fields ! "}) ;
	}
	else {

		updatepass(req.body.psswd,req.body.newpsswd,req.params.username, function (err,usr) {

			//console.log(usr);
   	
    			if (err) res.status(404).json(usr);
			else {
				if(usr.success==true) res.json(usr);
				else res.status(400).json(usr);
			}
  		});

	}

};
