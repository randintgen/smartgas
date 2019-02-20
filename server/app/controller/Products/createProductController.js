'use strict';

var Product = require('../../model/Products/cproduct.js');
var authenticate = require('../../auth/auth.js')

exports.create_a_product = function(req, res) {

	var new_product = new Product(req.body);

	//console.log(req.body);

	var error;
	var nogo = 0 ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});

	else {

		if(!(new_product.type && new_product.description && new_product.tags && new_product.category)) { 
			res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		}
		else if(new_product.type.length>255 || new_product.description.length>255 || new_product.category.length>255 ||new_product.tags.length>255) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximu length exceeded !"});
		}
		else {
			if(!req.body.ipath) new_product.imgpath="home/fnp";
			else new_product.imgpath=req.body.ipath;
			if(!req.body.withdrawn) new_product.withdrawn = 0;
			else new_product.withdrawn = req.body.withdrawn;

			authenticate(req,function(error,result,usrid) {

				if(error) {
					res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
				}

				else {
					if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
					else {
						Product.create_product(new_product, function(err, product) {

    							if (err) res.status(400).json(product);
							else {
								if(product.success==true) res.json(product);
								else res.status(400).json(product);
							}

	 	 				});
					}
				}
			});
		}
	}
};


