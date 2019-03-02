'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');

removeprod = function(userid,fuelid,result) {

	var final;
	final = "SELECT admin FROM users WHERE userid='"+userid+"' ;";

	sql.query(final , function(err,res) {
	
		if(!res[0]) result(true,{"success":false,"message":"Invalid userid!"});
		else {

			if(res[0].admin==1) final = "DELETE FROM fuel WHERE fuelid='"+fuelid+"' ;";
			else final = "UPDATE fuel set withdrawn=1 WHERE fuelid='"+fuelid+"' ;";
			sql.query(final , function(err2,res2) {
				if(err2) result(true,{"success":false,"message":"Something went completely wrong!"});
				else {
					 if(!res2.affectedRows) { 
						//console.log(res2);
						console.log("Product to delete does not exist !");
						result(null,{"sucess":false,"message":"Product id does not exist in database !"});
					 }
					 else {
						//console.log(res2);
						if(!res2.message=='' && !res2.changedRows) {
							console.log("Product with id "+fuelid+" is already withdrawn !");
					 		result(null,{"success":true,"message":"Product is already withdrawn"});
						}
						else {
							console.log("Product with id "+fuelid+" has been deleted !");
					 		result(null,{"success":true,"message":"OK"});
						}
					}
				}
			});
		}
	});


};

module.exports= removeprod;
