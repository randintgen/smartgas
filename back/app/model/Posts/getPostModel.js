'user strict';

const sql = require('../db.js');

Postlist = function(start, count, geoflag, geoDist, geoLng, geoLat, dateFrom, dateTo, shop_flag, shops, product_flag, products, tag_flag, tags, sort, result) {

    var f1;
    var final = "SELECT post.price, post.dateFrom as date, fuel.type, fuel.description, fuel.fuelid as productId, fuel.tags as productTags, shops.shopid as shopId, shops.name as shopName, shops.tags as shopTags, shops.address as shopAddress";
    var fr = " FROM ((post INNER JOIN fuel ON fuel.fuelid = post.fuelid) INNER JOIN shops ON shops.shopid = post.shopid)";
    var wh = " WHERE (post.dateFrom BETWEEN CAST('" + dateFrom + "' AS DATE) AND CAST('" + dateTo + "' AS DATE))";
    if (shop_flag) wh += " AND (shops.shopid IN " + shops + ")";
    if (product_flag) wh += " AND (fuel.fuelid IN " + products + ")";
    if (tag_flag) {
        wh += " AND ( FIND_IN_SET('" + tags[0] + "', fuel.tags) OR FIND_IN_SET('" + tags[0] + "', shops.tags)";
        for (var i = 1; i < tags.length; i++) {
            wh += " OR FIND_IN_SET('" + tags[i] + "', fuel.tags) OR FIND_IN_SET('" + tags[i] + "', shops.tags)";
        }
        wh += " )";
    }
    if (geoflag) {
        //final += ", (6371 * acos (cos ( radians(" + geoLat + ") )* cos( radians( shops.lat ) )* cos( radians( shops.lng ) - radians(" + geoLng + ") )+ sin ( radians(" + geoLat + ") )* sin( radians( shops.lat ) ))) AS shopDist";
        // POINT(lon, lat)
        final += ", ST_Distance_Sphere(POINT(" + geoLng + ", " + geoLat + "), POINT(shops.lng, shops.lat))/1000 AS shopDist";
        //final += ", ST_Distance(ST_GeomFromText('POINT(" + geoLng + " " + geoLat + ")', 4326), ST_GeomFromText('POINT(shops.lng shops.lat)', 4326))/1000 AS shopDist";
        wh += " HAVING shopDist < " + geoDist;
    }
    final += fr + wh;
    f1 = final + sort + " LIMIT " + count + " OFFSET " + start + " ;";
    sql.query(f1, function (err, res) {

//        if (err) result(true, {"success": false, "message": "Something went wrong,please try again later !"});
        if (err) result(true, {"success": false, "message": err});
        else {
            var prices = [];
            for(var i=0 ; i<res.length ; i++) {
                res[i].productTags = res[i].productTags.split(',');
                res[i].shopTags = res[i].shopTags.split(',');
                if (!geoflag) res[i].shopDist = null;
                prices.push(res[i]);
            }

            var f2 = final + " ;";
            sql.query(f2, function (err2, res2) {
                if (err2 || !res2) result(true,{"success": false, "message": "Something went wrong,please try again later !"});
  //              if (err2 || !res2) result(true,{"success": false, "message": err2});
                else {
                    result(null, {"start": parseInt(start), "count": prices.length, "total": res2.length, "prices": prices});
                }
            });

        }
    });
}

module.exports= Postlist;
