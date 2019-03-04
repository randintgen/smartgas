'use strict';

var Shop = require('../../model/Shops/putShopidModel.js');
var authenticate = require('../../auth/auth.js')
const checks = require("../utils.js");

exports.update_a_shop = function(req, res) {

	var error2=0;
	// tags must be in form ["tag1","tag2","tag3"] but database supports "tag1,tag2,tag3"
	if(Array.isArray(req.body.tags)) {
		var i=0;
		var temp="";
		if(req.body.tags.length!=0 ){
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
		}

		req.body.tags=temp;
	}

	var new_shop = new Shop(req.body);


		var nogo = 0 ;

		if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});               // check for xml
		else if(error2) res.status(400).json({"success":false,"message":"Tags must be a list of strings"}); // if tags is[1,2]
		else {

			// check for empty fields
			if( (typeof new_shop.name=="undefined")  || (typeof new_shop.tags=="undefined") || (typeof new_shop.address=="undefined") || (typeof new_shop.lng=="undefined") || (typeof new_shop.lat=="undefined") ) {
					res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
			}

			// check for fields length
			else if(new_shop.name.length>255 || new_shop.address.length>255 || new_shop.tags.length>2000) {
					res.status(400).json({"success":false,"message":"Please provide compatible input,maximum length exceeded !"});
			}

			// check for fields type
			else if(typeof new_shop.name!='string' || checks.checkGeo(req.body.lat.toString(), req.body.lng.toString()) || typeof new_shop.tags!='string' || typeof new_shop.address != 'string'){
					//console.log('vrika');
					res.status(400).json({"success":false,"message":"Please provide valid fields !"});

			}
			// check for id's type
			// check for id's type
			else if(!((parseFloat(req.params.id)%1)===0)) res.status(400).json({"success":false,"message":"Shop id given is not an integer !"});
			else if (Number(req.params.id) > 2147483647) res.status(400).json({"success":false,"message":"Variable shop id has exceeded maximum length !"});
			else if (Number(req.params.id) < 0) res.status(400).json({"success":false,"message":"Variable shop id is negative!"});
			else {

				authenticate(req,function(error,result,usrid) {

					if(error) {
						res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
					}

					else {
						if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
						else {
							Shop.update_shop(new_shop,req.params.id,function(err, shop) {

	    							if (err) res.status(400).json(shop);
								else {
									if(shop.success==true) {
										if(shop.shop.tags[0]=="" && shop.shop.tags.length==1 ){
											shop.shop.tags=[]
											console.log("aaaaaaaaaaaaaaaaaaaaa");
										}
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
	}
