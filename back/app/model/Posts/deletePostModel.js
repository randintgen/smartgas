'user strict';

const sql = require('../db.js');

del_post = function(postId, usrid, result){

        // only user can delete his/her own post
        sql.query("SELECT userid FROM post WHERE postid = ? LIMIT 1", postId, function(err1, res1) {
            if (err1) {
                //console.log("ERROR ON SEARCH :" + err1);
                result(true, {"success":false, "message":"Something went wrong !"});
            }
            else if (!res1[0]) {
                result(true, {"success":false, "message":"Please provide a valid postId !"});
            }
            else if (res1[0].userid != usrid) {
                result(null, {"success": false, "message": "You have no access to delete this post!"});
            }
            else {
                var inp = "DELETE FROM post WHERE ( userid = '" + usrid + "' AND postid = '" + postId + "');";
                sql.query(inp, function(err, res) {
                    if (err) {
                        //console.log("ERROR ON DELETE POST :", err);
                        result(null, {"success":false,"message":"Delete failed !"});
                    }
                    else {
                        console.log("DELETED POST");
                        result(null, {"success":true,"message":"Your post has been deleted successfully!"});
                    }
                });
            }
        });
};

module.exports = del_post;
