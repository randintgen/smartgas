'use strict';

const checks = require("../utils.js");

var getem_id = require('../../model/Shops/getShopidModel.js');

exports.view_shopid = function(req, res) {

	if (req.query.format && req.query.format != "json") {
    	res.status(400).json({"success":false, "message":"Unsupported format !"});
  	}
	else if(checks.checkInt(Number(req.params.id))) res.status(400).json({"success":false,"message":"Shop id must be a non negative integer less than 2147483647 !"});
//		else if(req.params.id.length > 11) res.status(400).json({"success":false,"message":"Variable shop id has exceeded maximum length !"});
	else {

		getem_id(Number(req.params.id), function (err,shop) {

    		if (err) res.status(400).json(shop);
			else {
				if (shop.success == true) res.json(shop);
				else res.status(404).json(shop);
			}
		});
	}
};
