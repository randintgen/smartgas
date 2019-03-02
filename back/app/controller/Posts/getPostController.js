'use strict';

const checks = require("../utils.js");

var Postlist = require('../../model/Posts/getPostModel.js');

// false if |list[i] - value| = 1 for some i, else true || make sure sort list is ok
function checkPrev(mylist, value) {
    for (var i=0; i<mylist.length; i++) {
        if ((mylist[i] - value == 1) || (value - mylist[i] == 1)) return false;
    }
    return true;
}

exports.my_post_list = function(req, res) {

    //console.log(req.query);
    var flag = false;
    var error;
    var temp;
    var temp2;
    var tempList;

    var start = 0;
    var count = 20;
    var geoflag = false;
    var geoDist;
    var geoLng;
    var geoLat;
    var dateFrom;
    var dateTo;

    // shop, products = (shop1,shop2,...,shop_last)
    var shop_flag = false;
    var shops = "(";
    var product_flag = false;
    var products = "(";
    var tag_flag = 0;
    var tags_str;   // tags = "val1|val2|...|valn"
    var sort = [0];   // price|ASC -> 0, price|DESC -> 1, date|ASC -> 3, date|DESC -> 4, geoDist|ASC -> 6, geoDist|DESC -> 7
    var sort2 = " ORDER BY price ASC";

    if (req.query.format && req.query.format != "json") {
        flag = true;
        error = "Unsupported format !";
    }
    if (flag == false && req.query.start) {
        if (checks.checkInt(Number(req.query.start))) {
            flag = true;
            error = "Variable start is of type Integer and should not be negative !";
        }
        else start = Number(req.query.start);
    }
    if (flag == false && req.query.count) {
        if (checks.checkInt(Number(req.query.count)) || Number(req.query.count) == 0) {
            flag = true;
            error = "Variable count is of type Integer and should be positive !";
        }
        else count = Number(req.query.count);
    }
    if (flag == false) {
        if (!req.query.geoDist && !req.query.geoLng && !req.query.geoLat) {
            geoflag = false;
        }
        else if (req.query.geoDist && req.query.geoLng && req.query.geoLat) {
            if (checks.checkInt(Number(req.query.geoDist)) || Number(req.query.geoDist) == 0) {
                flag = true;
                error = "Variable geoDist is of type Integer and should be positive !";
            }
            else if (checks.checkGeo(req.query.geoLat, req.query.geoLng)) {
                flag = true;
                error = "Coordinates are not in the right format (lat -> [-90, 90] | lng -> [-180, 180]) !";
            }
            else {
                geoflag = true;
                geoDist = req.query.geoDist;
                geoLng = req.query.geoLng;
                geoLat = req.query.geoLat;
            }
        }
        else {
            flag = true;
            error = "[geoDist, geoLng, geoLat] should all either be undeclared or have a value !";
        }
    }
    if (flag == false) {
        if (!req.query.dateFrom && !req.query.dateTo) {
            dateFrom = new Date().toJSON().substr(0,10);
            dateTo = dateFrom;
        }
        else if (req.query.dateFrom && req.query.dateTo) {
            if (checks.checkDate(req.query.dateFrom) || checks.checkDate(req.query.dateTo)) {
                flag = true;
                error = "Date has format YYYY-MM-DD !";
            }
            else if (checks.compDate(req.query.dateFrom, req.query.dateTo)) {
                flag = true;
                error = "dateFrom must not be later than dateTo !";
            }
            else {
                dateFrom = req.query.dateFrom;
                dateTo = req.query.dateTo;
            }
        }
        else {
            flag = true;
            error = "[dateFrom, dateTo] should both either be undeclared or have a value !";
        }
    }
    if (flag == false && req.query.shops) {
        shop_flag = true;
        if (typeof req.query.shops == "string") tempList = [req.query.shops];
        else tempList = req.query.shops;

        for (var i=0; i<tempList.length; i++) {
            if (checks.checkInt(Number(tempList[i]))) {
                flag = true;
                error = "Variable shopId is a String of type Integer and should be positive !";
                break;
            }
            else if (i == 0) shops += tempList[i];
            else shops += "," + tempList[i];
        }
        shops += ")";
    }
    if (flag == false && req.query.products) {
        product_flag = true;
        if (typeof req.query.products == "string") tempList = [req.query.products];
        else tempList = req.query.products;

        for (var i=0; i<tempList.length; i++) {
            if (checks.checkInt(Number(tempList[i]))) {
                flag = true;
                error = "Variable productId is a String of type Integer and should be positive !";
                break;
            }
            else if (i == 0) products += tempList[i];
            else products += "," + tempList[i];
        }
        products += ")";
    }
    if (flag == false && req.query.tags) {
        tag_flag = true;
        if (typeof req.query.tags == "string") tags_str = req.query.tags;
        else {
            for (var i=0; i<req.query.tags.length; i++) {
                if (i == 0) tags_str = req.query.tags[i];
                else tags_str += "|" + req.query.tags[i];
            }
        }
    }
    if (flag == false && req.query.sort) {
        if (typeof req.query.sort == "string") tempList = [req.query.sort];
        else tempList = req.query.sort;

        sort = [];
        sort2 = " ORDER BY ";
        if (tempList.length > 3) {
            flag = true;
            error = "Wrong sort list !";
        }
        else {
            for (var i=0; i<tempList.length; i++) {
                if (tempList[i] == "price|ASC") {
                    temp = 0;
                    temp2 = "price ASC";
                }
                else if (tempList[i] == "price|DESC") {
                    temp = 1;
                    temp2 = "price DESC";
                }
                else if (tempList[i] == "date|ASC") {
                    temp = 3;
                    temp2 = "date ASC";
                }
                else if (tempList[i] == "date|DESC") {
                    temp = 4;
                    temp2 = "date DESC"
                }
                else if (tempList[i] == "geoDist|ASC") {
                    temp = 6;
                    temp2 = "shopDist ASC";
                    if (geoflag == false) {
                        flag = true;
                        error = "Cannot sort by distance. Current location not provided.";
                        break;
                    }
                }
                else if (tempList[i] == "geoDist|DESC") {
                    temp = 7;
                    temp2 = "shopDist DESC";
                    if (geoflag == false) {
                        flag = true;
                        error = "Cannot sort by distance. Current location not provided.";
                        break;
                    }
                }
                else {
                    flag = true;
                    error = "Not valid value in sort list !";
                    break;
                }
                if (checkPrev(sort, temp)) {
                    sort.push(temp);
                    if (i == 0) sort2 += temp2;
                    else sort2 += ", " + temp2;
                }
                else {
                    flag = true;
                    error = "Wrong sort list";
                    break;
                }
            }
        }
    }

    if (flag == true) {
        // checks failed
        res.status(400).json({
            "success": "false",
            "message": error
        });
    }
    else {

        Postlist(start, count, geoflag, geoDist, geoLng, geoLat, dateFrom, dateTo, shop_flag, shops, product_flag, products, tag_flag, tags_str, sort2, function(err, result) {
            if (err) res.status(400).json(result);
            else {
		//console.log(result);
                if (result.success == true) res.json(result);
                else res.status(400).json(result);
            }
        });
    }
};
