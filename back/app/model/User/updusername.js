'user strict';

const sql = require('../db.js');

updatename = function(newusr,usrid,result){


	sql.query("SELECT 1 FROM users WHERE username = ? LIMIT 1 " , newusr , function (erru,resu) {

		if (resu[0]) {

			result(null,{"success":false,"message":"Username already in use !"});

		}
		
		else {

			final ="UPDATE users SET username = '"+newusr+"' WHERE userid = '"+usrid+"' ; ";  

			sql.query(final ,function (err, res) {

				if(err) {

					console.log("error: ", err);
					result(true, {"success":false,"message":err});
				}

				else {
					//console.log(newusr,usrid);
					result(null, {"success":true,"message":"Username update completed!"});
				}

			}); 

		}

	});
	
};

module.exports= updatename;
