'use strict';

var Product = require('../../model/Products/putproduct.js');
var authenticate = require('../../auth/auth.js')

exports.update_a_product = function(req, res) {

	var error2=0;
	var temptags = req.body.tags;
	// tags must be in form ["tag1","tag2","tag3"] but database supports "tag1,tag2,tag3"
	if(Array.isArray(req.body.tags)) {
		var i=0;
		var temp="";
		if(req.body.tags.length==0){
			error2=1;
		}
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


	var new_product = new Product(req.body);


	var nogo = 0 ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported"});               // check for xml
	else if(error2) res.status(400).json({"success":false,"message":"Tags must be a list of strings"}); // if tags is[1,2]
	else {

		// check for empty fields
		if((typeof new_product.tags=='undefined' && new_product.tags!='' )) { 
			console.log(11111)
			res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		}

		else if(!(new_product.type && new_product.description && new_product.category)) {
			res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		}

		// check for fields length
		else if(new_product.type.length>255 || new_product.description.length>255 || new_product.category.length>255 ||new_product.tags.length>2000) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximum length exceeded !"});
		}

		// check for fields type
		else if(typeof new_product.type!='string' || typeof new_product.description!='string' || typeof new_product.category!='string'
			|| typeof new_product.tags!='string') {
			res.status(400).json({"success":false,"message":"Please provide valid fields !"});

		}
		// check for id's type
		else if(!((parseFloat(req.params.id)%1)===0)) res.status(400).json({"success":false,"message":"Product id given is not an integer !"});
		else if (Number(req.params.id) > 2147483647) res.status(400).json({"success":false,"message":"Variable product id has exceeded maximum length !"});
		else if (Number(req.params.id) < 0) res.status(400).json({"success":false,"message":"Variable product id is negative!"});
		else {

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
								if(product.success==true) res.json(product.product);
								else {console.log("aa");res.status(404).json(product)};
							}

	 	 				});
					}
				}
			});
		}
	}
};
