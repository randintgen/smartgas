'user strict';

const sql = require('../db.js');

var Shop = function(shop) {

    this.name = shop.name;
    this.tags = shop.tags;
    this.withdrawn = shop.withdrawn;
    this.imgpath = shop.ipath;
    this.lng = shop.lng;
    this.lat = shop.lat;
    this.address = shop.address;

};

var newShop = function(id,shop) {

    this.id = "" + id;
    this.name = shop.name;
    this.tags = shop.tags.split(',');
    this.withdrawn = shop.withdrawn;
    this.lng = shop.lng;
    this.lat = shop.lat;
    this.address = shop.address;
};

Shop.create_shop = function(newshop,result) {

    var temp,tagsplit;
    //console.log(newshop);
    sql.query("INSERT INTO shops set ?", newshop, function (err, res) {

        if(err) {

            console.log("error in new shop : ", err);
                result(true,{"success":false,"message":"Something went wrong,please try again later !"});
        }

        else {
                console.log("New shop created , shopid -->  " + res.insertId );
            var newpr = new newShop(res.insertId,newshop);
            //console.log(newpr.id);

            if(newpr.withdrawn==0) newpr.withdrawn=false
            else newpr.withdrawn=true
            if(newpr.tags[0]=="" && newpr.tags.length==1){
              newpr.tags=[]
            }
            result(null, {"success":true,"shop":newpr});

        }

    });
};

module.exports= Shop;
