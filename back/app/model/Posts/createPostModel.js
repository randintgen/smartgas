'user strict';

const sql = require('../db.js');

createpost = function createPost(newPost, dates, userid, result) {

    sql.query("SELECT fuelid, tags, type, description FROM fuel WHERE fuelid = ? LIMIT 1", newPost.productId, function (err, res) {
        if (err) {
            //console.log("error on insert : ", err);
            result(true, {"success": false, "message": "Something went wrong while checking productId !"});
        }
        else if (!res[0]) {
            //console.log("Fuel not found!");
            result(null, {"success": false, "message": "Fuel with corresponding productId not found !"});
        }
        else {
            sql.query("SELECT shopid, name, address, tags FROM shops WHERE shopid = ? LIMIT 1", newPost.shopId, function (err2, res2) {
                if (err2) {
                    //console.log("error on insert : ", err2);
                    result(true, {"success": false, "message": "Something went wrong while checking shopId !"});
                }
                else if (!res2[0]) {
                    //console.log("Shop not found!");
                    result(null, {"success": false, "message": "Shop with corresponding shopId not found !"});
                }
                else {
                    inp = "INSERT INTO post (shopid, userid, fuelid, price, my_date) VALUES ";
                    for(var i=0; i<dates.length; i++) {
                        if (i != 0) inp += ", ";
                        inp += "( '" + newPost.shopId + "' , '" + userid + "' , '" + newPost.productId + "' , '" + newPost.price + "' , '" + JSON.stringify(dates[i]._now).substr(1,10) + "')";
                    }
                    inp += ";";

                    sql.query(inp, function (err3, res3) {
                        if (err3) {
                            console.log("error on insert : ", err3);
                            result(true, {"success": false, "message": "Insert failed !"});
                        }
                        else {

                            var mylist = [];

                            for(var i=0 ; i<dates.length ; i++) {
                                mylist.push({})
                                mylist[i].price = newPost.price;
                                mylist[i].shopId = newPost.shopId;
                                mylist[i].productId = newPost.productId;
                                mylist[i].date = JSON.stringify(dates[i]._now).substr(1,10);
                            }

                            //console.log("New post created , price -->  " + newPost.price );
                            result(null, {
                                "success": true,
                                "start": 0,
                                "count": dates.length,
                                "total": dates.length,
                                "prices": mylist
                            });
                        }
                    });
                }
            });
        }
    });

};

module.exports = createpost;
