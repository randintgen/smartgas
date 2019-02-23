'use strict';

var login = require('../../model/User/loginusr.js');

function validateEmail(email) {

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

exports.login_as_user = function(req, res) {

  	//console.log(!req.body.password);
	//console.log(!req.body.username);

	var flag = 0;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});
	else if(! (req.body.password && req.body.username) ) {
		res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
	}
	else if(req.body.username.length > 255) {
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
	}
	else if(typeof req.body.username!='string' ||typeof req.body.password!='string' ) {
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
	}
	else {
		if(validateEmail(req.body.username)) flag=1; 
		login(req.body.username , req.body.password ,flag, function (err,usr) {

    			if (err) res.status(404).json(usr);
			else {
				if(usr.success==true) res.json(usr);
				else res.status(403).json(usr);
			}
  		});
	}

};

