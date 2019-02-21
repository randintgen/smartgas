'use strict';

var Shop = require('../../model/Shops/putShopidModel.js');
var authenticate = require('../../auth/auth.js')

exports.update_a_shop = function(req, res) {

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

	var new_shop = new Shop(req.body);


	var nogo = 0 ;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML"});               // check for xml
	else if(error2) res.status(400).json({"success":false,"message":"Tags must be a list of strings"}); // if tags is[1,2]
	else {

		// check for empty fields
		if( (!(new_shop.name  && new_shop.tags && new_shop.address&& new_shop.lng&& new_shop.lat)) ||(typeof new_shop.withdrawn=="undefined")) {
      console.log(typeof new_shop.lat);
			res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
		}

		// check for fields length
		else if(new_shop.name.length>255 || new_shop.address.length>255 ||new_shop.tags.length>255) {
			res.status(400).json({"success":false,"message":"Please provide compatible input,maximu length exceeded !"});
		}

		// check for fields type
		else if(typeof new_shop.name!='string' || typeof new_shop.lng!='number' || typeof new_shop.lat!='number'|| typeof new_shop.tags!='string'||typeof new_shop.address!='string'|| typeof new_shop.withdrawn!='boolean') {

			res.status(400).json({"success":false,"message":"Please provide valid fields !"});

		}
		// check for id's type
		else if(isNaN(req.params.id)) res.status(400).json({"success":false,"message":"Shop id given is not an integer !"});
		else if(req.body.withdrawn && typeof new_shop.withdrawn!='boolean') res.status(400).json({"success":false,"message":"Please provide valid fields !"});
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
								if(shop.success==true) res.json(shop);
								else res.status(404).json(shop);
							}

	 	 				});
					}
				}
			});
		}
	}
};
