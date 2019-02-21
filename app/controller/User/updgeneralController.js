'use strict';

var updategen = require('../../model/User/updgeneral.js');
var authenticate = require('../../auth/auth.js')

exports.update_gen_user = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else if(!req.body.ipath) {
		res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
	}
	else if(req.body.ipath.length > 255) {
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
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

};
