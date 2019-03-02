'user strict';

const sql = require('../db.js');

get_pid = function(shopid,result) {

	var final,tagsplit,temp;
	//console.log(fuelid);
	final = "SELECT shopid as id, name, address, lng, lat, tags, withdrawn FROM shops WHERE shopid = " + shopid + " LIMIT 1 ;";
	sql.query(final,function (err, res) {

		if(err) {
			//console.log("error: ", err);
			result(true, {"success":false,"message":"Something went wrong,please try again later !"});
		}
		else {
			//console.log(res);

			if(!res[0]) result(null,{"success":false,"message": "No matching shop with the id given !"});
			else {

				res[0].id = "" + res[0].id;

				if (res[0].withdrawn == 0) res[0].withdrawn = false;
				else res[0].withdrawn = true;

				res[0].tags = res[0].tags.split(',');

				result(null,{"success":true,"shop":res[0]});
			}
		}
	});
};

module.exports = get_pid;
