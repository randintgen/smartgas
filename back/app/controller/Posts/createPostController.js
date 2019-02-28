'use strict';

const functions = require("../utils.js");

var createpost = require('../../model/Posts/createPostModel.js');
var authenticate = require('../../auth/auth.js')

exports.create_post = function(req, res) {

    if (req.query.format && req.query.format != "json") {
        res.status(400).json({
            "success": false,
            "message": "Unsupported format !"
        });
    }
    else if (!req.body.price || !req.body.dateFrom || !req.body.dateTo || !req.body.productId || !req.body.shopId) {
        res.status(400).json({
            "success": false,
            "message": "Please complete all the mandatory fields !"
        });
    }
    else if (typeof req.body.price != "number" || (req.body.price <= 0) || functions.checkInt(req.body.productId) || functions.checkInt(req.body.shopId)) {
        res.status(400).json({
            "success": false,
            "message": "One or more fields are not valid !"
        });
    }
    else if (functions.checkDate(req.body.dateFrom) || functions.checkDate(req.body.dateTo)) {
        res.status(400).json({
            "success": false,
            "message": "Date must be in a valid form (YYYY-MM-DD) !"
        });
    }
    else if (functions.compDate(req.body.dateFrom, req.body.dateTo)) {
        res.status(400).json({
            "success": false,
            "message": "dateFrom must not be later than dateTo !"
        });
    }
    else {

        // has passed checks, continue to sql queries and authenticate check
        authenticate(req,function(error,result,usrid) {

            if (error) {
                res.status(400).json({
                    "success": false,
                    "message": "Please provide a valid authentication token !"
                });
            }
            else if (!result) {
                res.status(403).json({
                  "success": false,
                  "message": "Authentication failed !"
                });
            }
            else {

                createpost(req.body, usrid, function(err, post) {

                  if (err) res.status(400).json(post);
                  else {
                    if (post.success == true) res.json(post);
                    else res.status(400).json(post);
                  }
                });
            }
        });
    }
};
