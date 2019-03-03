'use strict';

const verifyme = require('../../model/User/verifyusr.js');


exports.verify_user = function(req, res) {

	if(!req.query.id || !req.query.userid) { 
		res.status(403).json({"success":false,"message":"Not authorized"});
		return;
	}
	else { 
		verifyme(req.query.id,req.query.userid ,function (err,usr) {

			if(err) res.status(404).json(usr);
			else {
				res.status(200).json(usr);
			}

	  	});
	}

};
