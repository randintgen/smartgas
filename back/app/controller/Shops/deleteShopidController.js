'use strict';

var delem = require('../../model/Shops/deleteShopidModel.js');
var authenticate = require('../../auth/auth.js')

exports.delete_a_shop = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported !"});

	else {

		if(isNaN(req.params.id)) res.status(400).json({"success":false,"message":"Shop id given is not an integer !"});
		else if(req.params.id.length > 11) res.status(400).json({"success":false,"message":"Variable shop id has exceeded maximum length !"});
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
								if(usr.success==true)res.json(usr);
								else res.status(400).json(usr);
							}

  						});
					}
				}
			});
		}
	}
};
