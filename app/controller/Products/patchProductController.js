'use strict';

var patchit = require('../../model/Products/patchproduct.js');
var authenticate = require('../../auth/auth.js');


exports.patch_a_product = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});               // check for xml
	else if(Object.keys(req.body).length!=1) res.status(400).json({"success":false,"message":"Only one field can be updated at a time,consider using put !"});
	else if(isNaN(req.params.id)) res.status(400).json({"success":false,"message":"Product id given is not an integer !"});
	else {
		var query="UPDATE fuel set ";
		var where=" WHERE fuelid="+req.params.id+" ;";
		var newfield;
		var final;
		var error2=0;
		if(req.body.name) {
			newfield=req.body.name;
			final=query+"type='"+newfield+"'"+where;
		}
		else if(req.body.description) {
			newfield=req.body.description;
			final=query+"description='"+newfield+"'"+where;
		}
		else if(req.body.category) {
			newfield=req.body.category;
			final=query+"category='"+newfield+"'"+where;
		}
		else if(req.body.imgpath) {
			newfield=req.body.imgpath;
			final=query+"imgpath='"+newfield+"'"+where;
		}
		else if(req.body.tags && Array.isArray(req.body.tags)) {
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
			newfield=req.body.tags;
			final=query+"tags='"+newfield+"'"+where;
		}
		else res.status(400).json({"success":false,"message":"Please provide a valid field for update !"});

		if(error2) {
			res.status(400).json({"success":false,"message":"Tags must be a list of strings"});
		}
		else if(newfield.length>255) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximu length exceeded !"});
		}
		else if(typeof newfield!='string') {
			res.status(400).json({"success":false,"message":"Please provide valid fields !"})
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

