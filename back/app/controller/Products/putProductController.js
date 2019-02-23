'use strict';

var Product = require('../../model/Products/putproduct.js');
var authenticate = require('../../auth/auth.js')

exports.update_a_product = function(req, res) {

	var error2=0;
	// tags must be in form ["tag1","tag2","tag3"] but database supports "tag1,tag2,tag3"
	if(Array.isArray(req.body.tags)) {
		var i=0;
		var temp="";
		for(var j=0 ; j<req.body.tags.length ; j++) {
			if(isNaN(req.body.tags[j])) {
				if(i==0) temp = req.body.tags[j];
				else temp=temp+","+req.body.tags[j];
				i=i+1;
			}
			else {
				error2=1;
				break;
			}
		}
		req.body.tags=temp;
	}

	var new_product = new Product(req.body);


	var nogo = 0 ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});               // check for xml
	else if(error2) res.status(400).json({"success":false,"message":"Tags must be a list of strings"}); // if tags is[1,2]
	else {

		// check for empty fields
		if(!(new_product.type && new_product.description && new_product.tags && new_product.category)) { 
			res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		}

		// check for fields length
		else if(new_product.type.length>255 || new_product.description.length>255 || new_product.category.length>255 ||new_product.tags.length>2000) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximu length exceeded !"});
		}

		// check for fields type
		else if(typeof new_product.type!='string' || typeof new_product.description!='string' || typeof new_product.category!='string' 
			|| typeof new_product.tags!='string') {

			res.status(400).json({"success":false,"message":"Please provide valid fields !"});

		}
		// check for id's type
		else if(!((parseFloat(req.params.id)%1)===0)) res.status(400).json({"success":false,"message":"Product id given is not an integer !"});
		else if(req.body.withdrawn && typeof new_product.withdrawn!='boolean') res.status(400).json({"success":false,"message":"Please provide valid fields !"});
		else {

			//if(!req.body.ipath) new_product.imgpath="/home/fnp";
			//else new_product.imgpath=req.body.ipath;
			//if(!req.body.withdrawn) new_product.withdrawn = 0;
			//else new_product.withdrawn = req.body.withdrawn;
			authenticate(req,function(error,result,usrid) {

				if(error) {
					res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
				}

				else {
					if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
					else {
						Product.update_product(new_product,req.params.id,function(err, product) {

    							if (err) res.status(400).json(product);
							else {
								if(product.success==true) res.json(product);
								else res.status(404).json(product);
							}

	 	 				});
					}
				}
			});
		}
	}
};

