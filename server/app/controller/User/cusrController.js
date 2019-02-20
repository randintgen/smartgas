'use strict';

var User = require('../../model/User/createusr.js');

function validateEmail(email) {

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

exports.create_a_user = function(req, res) {

	var new_user = new User(req.body);

	//console.log(req.body);

	var error;
	var nogo = 0 ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else {

		if( validateEmail(new_user.mail) == false ) {

			error = " Please enter a valid email address ! ";
			nogo = 1;

		} 

		if( !( new_user.mail && new_user.username && new_user.psswd ) ) { 

			error = "Please complete all the mandatory fields !";
			nogo = 1;

		}

		if(new_user.mail) {

			if ( new_user.mail.length > 255 ) {

				error = " Variable mail has exceeded maximum length ! " ;
				nogo = 1 ;

			}
		}

		if(new_user.username) {

			if ( new_user.username.length > 255 ) {

				error = " Variable username has exceeded maximum length ! " ;
				nogo = 1 ;

			}
		}
	

		if( nogo ) res.status(400).json({"success":false,"message":error});
	
		else {

			if(!new_user.admin) new_user.admin=0;

			if(!new_user.ipath) new_user.ipath='somepath';

			User.createusr(new_user, function(err, usr) {

    				if (err) res.status(400).json(usr);
				else {
					res.json(usr);
				}

	 	 	});

		}
	}

};

