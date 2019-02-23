'use strict';

var delem = require('../../model/Products/dproduct.js');
var authenticate = require('../../auth/auth.js')

exports.delete_products = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported !"});

	else {

		if(!((parseFloat(req.params.id)%1)===0)) res.status(400).json({"success":false,"message":"Product id given is not an integer !"});
		else if(req.params.id.length > 11) res.status(400).json({"success":false,"message":"Variable product id has exceeded maximum length !"});
		else {

			authenticate(req,function(error,result,usrid) {

				if(error) {
					res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
				}

				else {

					if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
					else {
						delem(usrid,req.params.id,function (err,usr) {
   	
    							if (err) res.status(400).json(usr);
							else {
								if(usr.success==true) res.json({"message":usr.message});
								else res.status(404).json(usr);
							}

  						}); 
					}
				}
			});
		}
	}
};
