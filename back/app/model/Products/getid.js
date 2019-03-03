'user strict';

const sql = require('../db.js');

get_pid = function(fuelid,result) {

	var final,tagsplit,temp;
	//console.log(fuelid);
	final = "SELECT fuelid as id ,type as name,description,category,tags,withdrawn FROM fuel WHERE fuelid="+fuelid+" LIMIT 1 ;";
	sql.query(final,function (err, res) {

		if(err) {

			console.log("error: ", err);
			result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}
		else {
			//console.log(res);

			if(!res[0]) result(null,{"success":false,"message":"No matching fuel with the id given !"});
			else {

				res[0].id = ""+res[0].id;

				if(res[0].withdrawn==0) res[0].withdrawn=false
				else res[0].withdrawn=true

				tagsplit = res[0].tags.split(',');
				temp = [];
				for(var j=0 ; j<tagsplit.length ; j++){
					temp.push(tagsplit[j]);
				}
				res[0].tags = temp;
				if(res[0].tags==""&&res[0].tags.length==1){
					res[0].tags = []
				}
				result(null,{"success":true,"product":res[0]});
			}
		}
	});
};

module.exports= get_pid;
