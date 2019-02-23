'user strict';

const sql = require('../db.js');

updpost = function(req,postId,usrid,result){

    // check post exists
    sql.query("SELECT userid FROM post WHERE postid = ? LIMIT 1", postId, function(err,res) {

        if (!res[0]) {
            //console.log("Post not found!");
            result(null,{"success":false,"message":"Post not found !"});
        }

        else {

            // compare usrid and check is the same as the post.userid
            if (res[0].userid !== usrid) {
                    //console.log("You have no access to edit this post!");
                    result(true, {"success":false,"message":"You have no access to edit this post!"});
            }
            else {

                // all checks done
                var flag = 0;
                var inp = "UPDATE post SET "
                if (req.productId) {
                    inp += "fuelid = '" + req.productId + "' ";
                    flag++;
                }
                if (req.shopid) {
                    if (flag) inp += " , ";
                    inp += "shopid = '" + req.shopId + "' ";
                    flag++;
                }
                if (req.price) {
                    if (flag) inp += " , ";
                    inp += "price = '" + req.price + "' ";
                }

                inp += "WHERE postid = '" + postId + "' ;";

                sql.query(inp, function(errf,resf) {

                    if (errf) {
                        //console.log("error: ", errf);
                        result(null, {"success": false, "message": "You have used wrong productId or shopId value !"});
                    }
                    else {
                        result(null, {"success":true,"message":"You have updated your post successfully !"});
                    }
                });
            }
        }
    });
};

module.exports= updpost;
