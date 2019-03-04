'use strict';

var patchit = require('../../model/Products/patchproduct.js');
var authenticate = require('../../auth/auth.js');


exports.patch_a_product = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported"});               // check for xml
	else if(Object.keys(req.body).length!=1) res.status(400).json({"success":false,"message":"Only one field can be updated at a time,consider using put !"});
	else if(!((parseFloat(req.params.id)%1)===0)) res.status(400).json({"success":false,"message":"Product id given is not an integer !"});
	else if (Number(req.params.id) > 2147483647) res.status(400).json({"success":false,"message":"Variable product id has exceeded maximum length !"});
	else if (Number(req.params.id) < 0) res.status(400).json({"success":false,"message":"Variable product id is negative!"});

	else {
		var query="UPDATE fuel set ";
		var where=" WHERE fuelid="+req.params.id+" ;";
		var newfield;
		var final;
		var error2=0;
		var error3=0;

		if(typeof req.body.name!='undefined') {
			if(typeof req.body.name!='string'){
				error3=1;
			}
			newfield=req.body.name;
			final=query+"type='"+newfield+"'"+where;
		}
		else if(typeof req.body.description!='undefined') {
			if(typeof req.body.description!='string'){
				error3=1;
			}
			newfield=req.body.description;
			final=query+"description='"+newfield+"'"+where;
		}
		else if(typeof req.body.category!='undefined') {
			if(typeof req.body.category!='string'){
				error3=1;
			}
			newfield=req.body.category;
			final=query+"category='"+newfield+"'"+where;
		}
		else if(typeof req.body.imgpath!='undefined') {
			if(typeof req.body.imgpath!='string'){
				error3=1;
			}
			newfield=req.body.imgpath;
			final=query+"imgpath='"+newfield+"'"+where;
		}

		else if(typeof req.body.tags!='undefined' && Array.isArray(req.body.tags)) {
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
			newfield=req.body.tags;
			final=query+"tags='"+newfield+"'"+where;
		}
		else if(typeof req.body.tags=='string') {
			 newfield=req.body.tags;
			 final=query+"tags='"+newfield+"'"+where;
		}

		else res.status(400).json({"success":false,"message":"Please provide a valid field for update !"});

		if(error2) {
			res.status(400).json({"success":false,"message":"Tags must be a list of strings"});
		}
		else if (error3) {
			res.status(400).json({"success":false,"message":"Please provide valid input of field!"});
		}
		else if(typeof req.body.tags!='undefined' && newfield.length>2000) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximum length exceeded !"});
		}
		else if(typeof req.body.tags=='undefined' && newfield.length>255) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximum length exceeded !"});
		}
		else {
			//console.log(final);

			authenticate(req,function(error,result,usrid) {

				if(error) {
					res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
				}

				else {
					if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
					else {
						patchit(final,req.params.id,function(err, product) {

    							if (err) res.status(400).json(product);
							else {

								if(product.success==true) res.json(product.product);
								else {console.log("aa");res.status(404).json(product);}
							}

	 	 				});
					}
				}
			});
		}
	}

};
