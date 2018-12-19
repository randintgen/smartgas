'use strict';

var getit = require('../../model/User/getprof.js');
var authenticate = require('../../auth/auth.js');

exports.get_profile = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else if(!req.params.username) {
		res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});	
	}
	else if(req.params.username.length > 255)  {
		res.status(400).json({"success":false,"message":"One or more fields are not valid !"});	
	}
	else {

		authenticate(req,function(error,result,usrid) {

			if(error) {
				res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
			}

			else {

				if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
				else {
					getit(req.params.username,function (err,usr) {
   	
    						if (err) res.status(404).json(usr);
						else {
							if(usr.success==true) res.json(usr);
							else res.status(404).json(usr);
						}

  					});
				}
		
			}

		});
	}

};
