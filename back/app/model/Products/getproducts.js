'user strict';

const sql = require('../db.js');

get_products = function(srt,cnt,stat,sorting,result) {

	var start = 0;
	var count = 20;
	var status = "ACTIVE";
	var sorter = "id|DESC";
	var frs,scnd,thrd,final ;
	var jsonval;
	var temp,tagsplit;
	var total=0;

	if(srt) start = srt;
	if(cnt) count = cnt;
	if(stat) status = stat;
	if(sorting) sorter = sorting;

	frs = " LIMIT "+count+" OFFSET "+start+" ;" ;

	if(status=="ACTIVE") scnd = " WHERE withdrawn=0";
	else if(status=="WITHDRAWN") scnd = "WHERE withdrawn=1";
	else if(status=="ALL") scnd = "";
	else scnd = " WHERE withdrawn=0";

	sortval = sorter.split('|');

	if(sortval[0]=="id") {

		if(sortval[1]=="ASC") thrd = " ORDER BY fuelid ASC ";
		else thrd = " ORDER BY fuelid DESC";

	}
	else if (sortval[0]=="name") {

		if(sortval[1]=="ASC") thrd = " ORDER BY type ASC ";
		else if(sortval[1]=="DESC") thrd = " ORDER BY type DESC";
		else thrd = " ORDER BY fuelid DESC";
	}

	final = "SELECT fuelid as id ,type as name,description,category,tags,withdrawn FROM fuel "+scnd+" "+thrd+" "+frs+" ;";

	sql.query(final,function (err, res) {

		if(err) {

			console.log("error: ", err);
			result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}

		else {
			//console.log(res);
			var products = [];
			for(var i=0 ; i<res.length ; i++) {

				res[i].id = ""+res[i].id;

				if(res[i].withdrawn==0) res[i].withdrawn=false
				else res[i].withdrawn=true

				tagsplit = res[i].tags.split(',');
				temp = [];
				for(var j=0 ; j<tagsplit.length ; j++){
					temp.push(tagsplit[j]);
				}
				res[i].tags = temp;
				if(tagsplit[0]==""&&tagsplit.length==1){
					res[i].tags=[]
				}
				//console.log(temp);
				products.push(res[i]);

			}
			//console.log(products);
			var totaling = "select count(*) as total from fuel "+scnd+" ;";
			//console.log(totaling);
			sql.query(totaling,function(err2,res2) {

				if(err2){
					console.log("error: ", err);
					result(true,{"success":false,"message":"Something went wrong,please try again later !"});
				}
				else {
					if(res2) total= res2[0].total;
					result(null, {"start":parseInt(start),"count":parseInt(count),"total":total,"products":products});
				}
			});
		}

	});

};

module.exports= get_products;
