// should fix issue here or with trigger

'user strict';

const sql = require('../db.js');

createpost = function createPost(newPost, userid, result) {

    sql.query("SELECT fuelid, tags, type, description FROM fuel WHERE fuelid = ? LIMIT 1", newPost.productId, function (err, res) {
        if (!res[0]) {
            console.log("Fuel not found!");
            result(true, {"success": false, "message": "Fuel with corresponding productId not found !"});
        }
        else {
            sql.query("SELECT shopid, name, address, tags FROM shops WHERE shopid = ? LIMIT 1", newPost.shopId, function (err2, res2) {
                if (!res2[0]) {
                    console.log("Shop not found!");
                    result(true, {"success": false, "message": "Shop with corresponding shopId not found !"});
                }
                else {
                    inp = "INSERT INTO post (shopid, userid, fuelid, price, dateFrom, dateTo) VALUES ( '" + newPost.shopId + "' , '" + userid + "' , '" + newPost.productId + "' , '" + newPost.price + "' , '" + newPost.dateFrom + "' , '" + newPost.dateTo + "');";
                    sql.query(inp, function (err3, res3) {
                        if (err3) {
                            console.log("error on insert : ", err3);
                            result(true, {"success": false, "message": "Insert failed !"});
                        }
                        else {
                            console.log("INSERT OK");
                            result(null, {
                                "success": true,
                                "postId": res3.insertId,    // not sure if need postId
                                "price": newPost.price,
                                "dateFrom": newPost.dateFrom,
                                "dateTo": newPost.dateTo,
                                "productName": res[0].type + ' ' + res[0].description,
                                "productId": newPost.fuelid,
                                "productTags": res[0].tags.split(','),
                                "shopId": newPost.shopId,
                                "shopName": res2[0].name,
                                "shopTags": res2[0].tags.split(','),
                                "shopAddress": res2[0].address
                            });
                        }
                    });
                }
            });
        }
    });

};

module.exports = createpost;
