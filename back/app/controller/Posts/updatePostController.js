'use strict';

const checks = require("../utils.js");

var updpost = require('../../model/Posts/updatePostModel.js');
var authenticate = require('../../auth/auth.js')

exports.update_post = function(req, res) {

    if (req.query.format && req.query.format != "json") {
        res.status(400).json({
            "success": false,
            "message": "Unsupported format !"
        });
    }
    else if (!req.params.id) {
        res.status(400).json({
            "success": false,
            "message": "Please provide postId !"
        });
    }
    else if (checks.checkInt(Number(req.params.id))) {
        res.status(400).json({
            "success": false,
            "message": "postId is not valid !"
        });
    }
    else if (!req.body.productId && !req.body.shopId && !req.body.price) {
        res.status(400).json({
            "success": false,
            "message": "Please complete at least one field !"
        });
    }
    else if (req.body.productId && checks.checkInt(Number(req.body.productId))) {
        res.status(400).json({
            "success": false,
            "message": "productId is not valid !"
        });
    }
    else if (req.body.shopId && checks.checkInt(Number(req.body.shopId))) {
        res.status(400).json({
            "success": false,
            "message": "shopId is not valid !"
        });
    }
    else if (req.body.price && (isNaN(parseFloat(req.body.price)) || parseFloat(req.body.price) <= 0)) {
        res.status(400).json({
            "success": false,
            "message": "price is not valid !"
        });
    } else {
        authenticate(req,function(error,result,usrid) {

            if(error) {
                res.status(400).json({
                    "success": false,
                    "message": "Please provide a valid authentication token !"
                });
            }
            else if(!result) {
                res.status(403).json({
                    "success": false,
                    "message": "Authentication failed !"
                });
            }
            else {

                // check OK
                updpost(req.body, Number(req.params.id), usrid, function(err1,res1) {
                    if(err1) res.status(403).json(res1);    // forbidden action
                    else {
                        if (res1.success == true) res.json(res1);
                        else res.status(400).json(res1);
                    }
                });
            }
        });
    }
};
