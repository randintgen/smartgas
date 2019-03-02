'use strict';

const checks = require("../utils.js");

var del_post = require('../../model/Posts/deletePostModel.js');
var authenticate = require('../../auth/auth.js')

exports.delete_post = function(req, res){

    if (req.query.format && req.query.format != "json") {
        res.status(400).json({
            "success": false,
            "message": "Unsupported format !"
        });
    }
    else if (!req.params.id || checks.checkInt(Number(req.params.id))) {
        res.status(400).json({
            "success": false,
            "message": "Please provide a valid postId !"
        });
    }
    else {
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
                del_post(Number(req.params.id), usrid, function (err1,res1) {
                    if(err1) res.status(404).json(res1);    // not authorized
                    else {
                        if (res1.success == true) res.json(res1);
                        else res.status(403).json(res1);
                    }
                });
            }
        });
    }
};
