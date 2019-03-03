'user strict';

const sql = require('../db.js');

MyPostlist = function(usrid, result) {

    var f1 = "SELECT post.price, post.postid, post.my_date as date, fuel.type as productName, fuel.description, fuel.tags as productTags, shops.shopid as shopId, shops.name as shopName, shops.tags as shopTags, shops.address as shopAddress";
    var fr = " FROM ((post INNER JOIN fuel ON fuel.fuelid = post.fuelid) INNER JOIN shops ON shops.shopid = post.shopid)";
    f1 += fr + " WHERE post.userid = " + usrid + " ORDER BY date DESC;";
    //console.log(f1);
    sql.query(f1, function (err, res) {

        if (err) {
            //console.log("ERROR ON SEARCH : " + err);
            result(true, {"success": false, "message": "Something went wrong,please try again later !"});
        }
        else {
        //console.log(res);
            var prices = [];
            for(var i=0 ; i<res.length ; i++) {
                res[i].productTags = res[i].productTags.split(',');
                res[i].shopTags = res[i].shopTags.split(',');
                res[i].date = JSON.stringify(res[i].date).substr(1,10);
                prices.push(res[i]);
            }
            result(null, {"success": true, "count": prices.length, "prices": prices});
        }
    });
}

module.exports = MyPostlist;
