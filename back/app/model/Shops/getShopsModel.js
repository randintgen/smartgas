'user strict';

const sql = require('../db.js');

get_Shops = function(start, count, status, sorter, result) {

  	var frs,scnd,thrd,final,f1;
	var jsonval;
	var sortval;
	var temp,tagsplit;
	var total=0;

	frs = " LIMIT " + count + " OFFSET " + start + " ;" ;

	if (status == "ACTIVE") scnd = " WHERE withdrawn = 0";
	else if (status == "WITHDRAWN") scnd = " WHERE withdrawn = 1";
	else if (status == "ALL") scnd = "";

	sortval = sorter.split('|');

	if(sortval[0] == "id") thrd = " ORDER BY shopid ";
	else thrd = " ORDER BY name ";

	if (sortval[1] == "ASC") thrd += "ASC";
	else thrd += "DESC";

	f1 = "SELECT shopid as id, name, address, lng, lat, tags, withdrawn FROM shops" + scnd;
	final = f1 + thrd + frs + " ;";

	sql.query(final,function (err, res) {

		if(err) {

			console.log("error: ", err);
			result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}

		else {
			//console.log(res);
			var shops = [];
			for(var i=0 ; i<res.length ; i++) {

				res[i].id = "" + res[i].id;

				if (res[i].withdrawn == 0) res[i].withdrawn = false;
				else res[i].withdrawn = true;

				res[i].tags = res[i].tags.split(',');

				shops.push(res[i]);

			}
			//console.log(shops);

			//if (shops.length < count) result(null, {"success": true, "start":parseInt(start), "count": count/*shops.length*/, "total": shops.length, "shops": shops});

				f1 += ";";	// changed here, was SELECT count(*) as total FROM shops
				sql.query(f1, function(err2,res2) {

					if(err2){
						console.log("error: ", err);
						result(true,{"success":false,"message":"Something went wrong,please try again later !"});
					}
					else {
            for(var j=0;j<shops.length;j++){
              if(shops[j].tags[0]=="" && shops[j].tags.length==1){
                shops[j].tags=[]
              }
            }
						result(null, {"success": true, "start":parseInt(start), "count":parseInt(count), "total": res2.length/* was total*/, "shops": shops});
					}
				});

		}

	});

};

module.exports = get_Shops;
