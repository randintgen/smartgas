'use strict';

const checks = require("../utils.js");

var Shop = require('../../model/Shops/createShopModel.js');
var authenticate = require('../../auth/auth.js')

exports.create_a_shop = function(req, res) {


    var error2=0;
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
    var new_shop = new Shop(req.body);



    var nogo = 0 ;

    if (req.query.format && req.query.format != "json") {
        res.status(400).json({
            "success": false,
            "message": "Unsupported format !"
        });
    }
    else if(error2) res.status(400).json({"success":false,"message":"Tags must be a list of strings"}); // if tags is[1,2]
    else {

        if( (typeof new_shop.name=="undefined")  || (typeof new_shop.tags=="undefined") || (typeof new_shop.address=="undefined") || (typeof new_shop.lng=="undefined") || (typeof new_shop.lat=="undefined") ) {
            res.status(400).json({"success":false,"message":"Please complete all the mandatory fields !"});
        }
        else if(new_shop.name.length>255 || new_shop.address.length>255 || new_shop.tags.length>2000) {
            res.status(400).json({"success":false,"message":"Please provide compatible input,maximum length exceeded !"});
        }
        else if(typeof new_shop.name!='string' || checks.checkGeo(req.body.lat.toString(), req.body.lng.toString()) || typeof new_shop.tags!='string' || typeof new_shop.address != 'string'){
            //console.log('vrika');
            res.status(400).json({"success":false,"message":"Please provide valid fields !"});

        }

        else if ( (typeof req.body.withdrawn != "undefined") && (! ( new_shop.withdrawn===false || new_shop.withdrawn==="false"|| new_shop.withdrawn===true || new_shop.withdrawn==="true" )) )  res.status(400).json({"success":false,"message":"Please provide valid fields !"});
        else if (typeof req.body.ipath != "undefined" && typeof req.body.ipath != "string") {
            res.status(400).json({
                "success":false,
                "message":"Please provide a valid value for field ipath !"
            });
        }
        else {

            if(!req.body.ipath) new_shop.imgpath="/home/fnp";
            else new_shop.imgpath=req.body.ipath;

            if(typeof req.body.withdrawn == "undefined" || new_shop.withdrawn==false || new_shop.withdrawn=='false' ) new_shop.withdrawn = 0;
            else new_shop.withdrawn = 1;

            authenticate(req,function(error,result,usrid) {

                if(error) {
                    res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});
                }

                else {
                    if(!result) res.status(403).json({"success":false,"message":"Authentication failed !"})
                    else {
                        Shop.create_shop(new_shop, function(err, shop) {

                                if (err) res.status(400).json(shop);
                            else {
                                //console.log(shop.shop);
                                if(shop.success==true) res.json(shop.shop);
                                else res.status(400).json(shop);
                            }

                        });
                    }
                }
            });
        }
    }
};
