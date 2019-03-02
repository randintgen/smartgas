'use strict';

var updatepass = require('../../model/User/updpass.js');

exports.update_pass_user = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else if(!(req.body.psswd&& req.body.newpsswd)) {
		res.status(400).json({"success":false,"message":"Please fill all the mandatory fields ! "}) ;
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
					updatepass(req.body.psswd,req.body.newpsswd,usrid, function (err,usr) {

						//console.log(usr);
   	
    						if (err) res.status(400).json(usr);
						else {
							res.json(usr);
						}
  					});

				}
			}
		});
	}

};
