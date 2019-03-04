'use strict';

var patchit = require('../../model/Shops/patchShopidModel.js');
var authenticate = require('../../auth/auth.js');
const checks = require("../utils.js");

exports.patch_a_shop = function(req, res) {

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported"});               // check for xml
	else if(Object.keys(req.body).length!=1) res.status(400).json({"success":false,"message":"Only one field can be updated at a time,consider using put !"});
	else if(!((parseFloat(req.params.id)%1)===0)) res.status(400).json({"success":false,"message":"Shop id given is not an integer !"});
	else if (Number(req.params.id) > 2147483647) res.status(400).json({"success":false,"message":"Variable shop id has exceeded maximum length !"});
	else if (Number(req.params.id) < 0) res.status(400).json({"success":false,"message":"Variable shop id is negative!"});


	else {

		var query="UPDATE shops set ";
		var where=" WHERE shopid="+req.params.id+" ;";
		var newfield;
		var final;
		var error2=0;
    var error3=0;




		if(typeof req.body.name!='undefined') {
			if(typeof req.body.name!='string'){
				error3=1;
			}
			newfield=req.body.name;
			final=query+"name='"+newfield+"'"+where;
		}
		else if(typeof req.body.lng!="undefined") {
			newfield=req.body.lng;
			final=query+"lng='"+newfield+"'"+where;
      if(checks.checkGeo("0", newfield.toString()) ){
        error3=1;
      }
		}
		else if(typeof req.body.lat!="undefined") {
			newfield=req.body.lat;
			final=query+"lat='"+newfield+"'"+where;
      if(checks.checkGeo(newfield.toString(), "0") ){
        error3=1;
      }
		}
		else if(typeof req.body.address!="undefined") {
			if(typeof req.body.address!='string'){
				error3=1;
			}
			//console.log("aa");
			newfield=req.body.address;
			final=query+"address='"+newfield+"'"+where;

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
		else*/
				else if(typeof req.body.tags!='undefined' && Array.isArray(req.body.tags)) {

					var i=0;
					var temp="";

					if (req.body.tags.length !=0){
						for(var j=0 ; j<req.body.tags.length ; j++) {
							if( isNaN(req.body.tags[j]) || typeof req.body.tags[j]=='string' ) {
								if(i==0) temp = req.body.tags[j];
								else temp=temp+","+req.body.tags[j];
								i=i+1;
							}
							else {
								error2=1;
								break;
							}
						}
					}

						req.body.tags=temp;
						newfield=req.body.tags;
						final=query+"tags='"+newfield+"'"+where;
				}

				else if(typeof req.body.tags!="undefined") {
					console.log("aaa");
					if(typeof req.body.tags!='string'){
						error3=1;
					}
					//console.log("aa");
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
						patchit(final,req.params.id,function(err, shop) {

    							if (err) res.status(400).json(shop);
							else {
								if(shop.success==true) {
								//	if(Array.isArray(req.body.tags)){
										if(shop.shop.tags[0]=="" && shop.shop.tags.length==1 ){
											shop.shop.tags=[]
											console.log("aaaaaaaaaaaaaaaaaaaaa");
										}
								//	}
									res.json(shop.shop);

							}
								else res.status(404).json(shop);
							}

	 	 				});
					}
				}
			});
		}
	}

};
