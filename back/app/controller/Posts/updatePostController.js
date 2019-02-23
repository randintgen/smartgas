'use strict';

var updpost = require('../../model/Posts/updatePostModel.js');
var authenticate = require('../../auth/auth.js')

// check input is a positive integer number with length less than 11
function checkInt(input) {
    if (input.length > 11 || !Number.isInteger(input)) return true;
    else return (input < 1);
}

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
    else if (checkInt(Number(req.params.id))) {
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
    else if (req.body.productId && checkInt(req.body.productId)) {
        res.status(400).json({
            "success": false,
            "message": "productId is not valid !"
        });
    }
    else if (req.body.shopId && checkInt(req.body.shopId)) {
        res.status(400).json({
            "success": false,
            "message": "shopId is not valid !"
        });
    }
    else if (req.body.price && (typeof req.body.price != "number" || (req.body.price <= 0))) {
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
