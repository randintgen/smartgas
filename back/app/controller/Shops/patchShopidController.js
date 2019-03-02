'use strict';

var patchit = require('../../model/Shops/patchShopidModel.js');
var authenticate = require('../../auth/auth.js');


exports.patch_a_shop = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});               // check for xml
	else if(Object.keys(req.body).length!=1) res.status(400).json({"success":false,"message":"Only one field can be updated at a time,consider using put !"});
	else if(isNaN(req.params.id)) res.status(400).json({"success":false,"message":"Product id given is not an integer !"});
	else {

		var query="UPDATE shops set ";
		var where=" WHERE shopid="+req.params.id+" ;";
		var newfield;
		var final;
		var error2=0;
    var error3=0;

		console.log(typeof req.body.tags!='undefined');
		console.log(Array.isArray(req.body.tags));
		if(req.body.name) {
			newfield=req.body.name;
			final=query+"name='"+newfield+"'"+where;
      if(typeof newfield!='string'){
        error3=1;
      }
		}
		else if(req.body.lng) {
			newfield=req.body.lng;
			final=query+"lng='"+newfield+"'"+where;
      if(typeof newfield!='number'){
        error3=1;
      }
		}
		else if(req.body.lat) {
			newfield=req.body.lat;
			final=query+"lat='"+newfield+"'"+where;
      if(typeof newfield!='number'){
        error3=1;
      }
		}
		else if(req.body.address) {
			console.log("aa");
			newfield=req.body.address;
			final=query+"address='"+newfield+"'"+where;
      if(typeof newfield!='string'){
        error3=1;
      }
		}
		//else if(typeof req.body.withdrawn!='undefined') {
		/*
      if(req.body.withdrawn) newfield=1;
      else newfield=0;
			final=query+"withdrawn='"+newfield+"'"+where;
      console.log(typeof req.body.withdrawn);
      if(typeof req.body.withdrawn!='boolean'){
        error3=1;
      }
		}
		else*/ if(typeof req.body.tags!='undefined' && Array.isArray(req.body.tags)) {
			console.log("23132");
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
			console.log(temp);
      if(typeof newfield!='string'){
        error3=1;
      }
			final=query+"tags='"+newfield+"'"+where;
		}
		else res.status(400).json({"success":false,"message":"Please provide a valid field for update !"});

		if(error2) {
			res.status(400).json({"success":false,"message":"Tags must be a list of strings"});
		}
		else if(newfield.length>255) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximu length exceeded !"});
		}

    else if(error3) {
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
