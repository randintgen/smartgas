'use strict';

var MyPostlist = require('../../model/Posts/getMyPostModel.js');

exports.my_own_posts = function(req, res) {
    if (req.query.format && req.query.format != "json") {
        res.status(400).json({
            "success": "false",
            "message": "Unsupported format !"
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

                MyPostlist (usrid, function(err, res2) {

                  if (err) res.status(400).json(res2);
                  else {
                    if (res2.success == true) res.json(res2);
                    else res.status(404).json(res2);
                  }
                });
            }
        });
    }
};