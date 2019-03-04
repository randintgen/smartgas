'use strict';

var Product = require('../../model/Products/cproduct.js');
var authenticate = require('../../auth/auth.js')

exports.create_a_product = function(req, res) {

	var error2=0;
	var temptags = req.body.tags;
	//console.log(req.body);
	// tags must be in form ["tag1","tag2","tag3"] but database supports "tag1,tag2,tag3"
	if(Array.isArray(req.body.tags)) {
		var i=0;
		var temp="";
		for(var j=0 ; j<req.body.tags.length ; j++) {
			if(isNaN(req.body.tags[j]) || typeof req.body.tags[j]=='string') {
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
	//console.log(Array.isArray(req.body.tags));
	var new_product = new Product(req.body);

	//console.log(new_product);

	var nogo = 0 ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});
	else if(error2) res.status(400).json({"success":false,"message":"Tags must be a list of strings"}); // if tags is[1,2]
	else {

		if((typeof new_product.tags=='undefined' && new_product.tags!='' )) { 
			console.log(11111)
			res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		}

		else if(!(new_product.type && new_product.description && new_product.category)) { 
			res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		}
		else if(new_product.type.length>255 || new_product.description.length>255 || new_product.category.length>255 ||new_product.tags.length>2000) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximum length exceeded !"});
		}
		else if(typeof new_product.type!='string' || typeof new_product.description!='string' || typeof new_product.category!='string' 
			|| typeof new_product.tags!='string') {

			res.status(400).json({"success":false,"message":"Please provide valid fields !"});

		}
		else if(req.body.withdrawn && !(req.body.withdrawn==false || req.body.withdrawn==true || req.body.withdrawn=='false' || req.body.withdrawn=='true') ) res.status(400).json({"success":false,"message":"Please provide valid fields !"});
		else {
			if(!req.body.ipath) new_product.imgpath="home/fnp";
			else new_product.imgpath=req.body.ipath;
			if(!req.body.withdrawn || req.body.withdrawn==false || req.body.withdrawn=='false' ) new_product.withdrawn = 0;
			else new_product.withdrawn = 1;

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
								if(product.success==true) {
									//console.log(product.product);
									res.json(product.product);
								}
								else res.status(400).json(product);
							}

	 	 				});
					}
				}
			});
		}
	}
};


