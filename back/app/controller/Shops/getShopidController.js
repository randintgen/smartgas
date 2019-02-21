'use strict';

var getem_id = require('../../model/Shops/getShopidModel.js');

exports.view_shopid = function(req, res) {


	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported !"});

	else {

		if(isNaN(req.params.id)) res.status(400).json({"success":false,"message":"Shop id given is not an integer !"});
		else if(req.params.id.length > 11) res.status(400).json({"success":false,"message":"Variable shop id has exceeded maximum length !"});
		else {

			getem_id(req.params.id,function (err,usr) {

    				if (err) res.status(400).json(usr);
				else {
					if(usr.success==true)res.json(usr);
					else res.status(404).json(usr);
				}

  			});
		}
	}
};
