'user strict';

const sql = require('../db.js');

del_post = function(postId, usrid, result){

        // admin can delete anything ????
        // if
        var inp = "DELETE FROM post WHERE ( userid = '" + usrid + "' AND postid = '" + postId + "');";
        sql.query(inp, function(err, res) {
            if (err) {
                console.log("ERROR ON DELETE POST :", err);
                result(null, {"success":false,"message":"Delete failed !"});
            }
            else if (res.affectedRows == 0) result(null, {"success":false,"message":"Please provide a valid postId !"});
            else {
                console.log("DELETED POST");
                result(null, {"success":true,"message":"Your post has been deleted successfully!"});
            }
        });
};

module.exports= del_post;
