'user strict';

const sql = require('../db.js');

updategen = function(req,usrid,result){

	var set="";
	var frs="";
	var lst="";
	var final="";

	sql.query("SELECT 1 FROM users WHERE userid = ? LIMIT 1" , usrid , function (erru,resu) {

		if (!resu[0]) {

			result(true,{"success":false,"message":"Invalid username!"});

		}
		
		else {


			if(typeof req.ipath!=='undefined') {

				set+="ipath = '"+req.ipath+"' ";

			}

			frs="UPDATE users SET ";
			lst=" WHERE userid = '"+usrid+"' ; ";
			final=frs+set+lst;


			sql.query(final,function (err, res) {

				if(err) {

					console.log("error: ", err);
					result(null,{"success":false,"message":err});
				}

				else {
					result(null, {"success":true,"message":"Update completed!"});
				}

			}); 

		}

	});
	

};

module.exports= updategen;
