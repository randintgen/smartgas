'user strict';

const sql = require('../db.js');

Postlist = function(start, count, geoflag, geoDist, geoLng, geoLat, dateFrom, dateTo, shop_flag, shops, product_flag, products, tag_flag, tags, sort, result) {

    //console.log(count);
    var f1;
    var final = "SELECT post.price, post.my_date as date, fuel.type as productName, fuel.description, fuel.fuelid as productId, fuel.tags as productTags, shops.shopid as shopId, shops.name as shopName, shops.tags as shopTags, shops.address as shopAddress, shops.lng as shopLng, shops.lat as shopLat";
    var fr = " FROM ((post INNER JOIN fuel ON fuel.fuelid = post.fuelid) INNER JOIN shops ON shops.shopid = post.shopid)";
    var wh = " WHERE (post.my_date BETWEEN '" + dateFrom + "' AND '" + dateTo + "')";
    if (shop_flag) wh += " AND (shops.shopid IN " + shops + ")";
    if (product_flag) wh += " AND (fuel.fuelid IN " + products + ")";
    if (tag_flag) wh += " AND (CONCAT(',', fuel.tags, ',', shops.tags, ',') REGEXP ',(" + tags + "),')";
    if (geoflag) {
        //final += ", (6371 * acos (cos ( radians(" + geoLat + ") )* cos( radians( shops.lat ) )* cos( radians( shops.lng ) - radians(" + geoLng + ") )+ sin ( radians(" + geoLat + ") )* sin( radians( shops.lat ) ))) AS shopDist";
        //final += ", ST_Distance(ST_GeomFromText('POINT(" + geoLng + " " + geoLat + ")', 4326), ST_GeomFromText('POINT(shops.lng shops.lat)', 4326))/1000 AS shopDist";
        // POINT(lon, lat)
        final += ", ST_Distance_Sphere(POINT(" + geoLng + ", " + geoLat + "), POINT(shops.lng, shops.lat))/1000 AS shopDist";
        wh += " HAVING shopDist < " + geoDist;
    }
    final += fr + wh;
    f1 = final + sort + " LIMIT " + count + " OFFSET " + start + " ;";
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
                if (!geoflag) res[i].shopDist = null;
                prices.push(res[i]);
            }
            var f2 = final + " ;";
            sql.query(f2, function (err2, res2) {
                if (err2) {
                    //console.log("ERROR ON SEARCH TOTAL : " + err2);
                    result(true,{"success": false, "message": "Something went wrong,please try again later !"});
                }
                else {
                    result(null, {"success": true, "start": parseInt(start), "count": parseInt(count), "total": res2.length, "prices": prices});
                }
            });
        }
    });
}

module.exports = Postlist;
