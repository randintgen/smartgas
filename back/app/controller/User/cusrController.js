// 5-20 username, password
'use strict';

var User = require('../../model/User/createusr.js');

function validateEmail(email) {

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

exports.create_a_user = function(req, res) {

	var new_user = new User(req.body);

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});
	else if(!( new_user.mail && new_user.username && new_user.psswd)) { 
		res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
	}
	else if(new_user.mail.length > 255 || new_user.username.length > 255) {
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
	}
	else if(typeof new_user.mail!='string' || typeof new_user.username!='string' || typeof new_user.psswd!='string' ) {
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
	}
	else if(validateEmail(new_user.mail) == false) {
		res.status(400).json({"success":false,"message":"Email adrress must be in a valid form !"});
	}
	else if(new_user.ipath && typeof new_user.ipath!='string') {
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
	}
	else {

		if(!new_user.admin) new_user.admin=0;

		if(!new_user.ipath) new_user.ipath='somepath';

		if(!new_user.flag) new_user.flag = 0;
		else new_user.flag = 1 ;

		User.createusr(new_user, function(err, usr) {

    			if (err) res.status(400).json(usr);
			else {
				res.json(usr);
			}

	 	 });

	}

};

