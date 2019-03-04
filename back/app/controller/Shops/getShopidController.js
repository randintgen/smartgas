'use strict';

const checks = require("../utils.js");

var getem_id = require('../../model/Shops/getShopidModel.js');

exports.view_shopid = function(req, res) {

	if (req.query.format && req.query.format != "json") {
    	res.status(400).json({"success":false, "message":"Unsupported format !"});
  	}
	else if(checks.checkInt(Number(req.params.id))) res.status(400).json({"success":false,"message":"Shop id must be a non negative integer less than 2147483647 !"});
	else {

		getem_id(Number(req.params.id), function (err,shop) {

    		if (err) res.status(400).json(shop);
			else {
				if (shop.success == true){
					if(shop.shop.tags[0]==""){
						shop.shop.tags=[]
					}

					res.json(shop.shop);
				}
				else res.status(404).json(shop);
			}
		});
	}
};
