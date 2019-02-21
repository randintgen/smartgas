'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');

removeshop = function(userid,shopid,result) {

	var final;
	final = "SELECT admin FROM users WHERE userid='"+userid+"' ;";

	sql.query(final , function(err,res) {

		if(!res[0]) result(true,{"success":false,"message":"Invalid userid!"});
		else {

			if(res[0].admin==1) final = "DELETE FROM shops WHERE shopid='"+shopid+"' ;";
			else final = "UPDATE shops set withdrawn=1 WHERE shopid='"+shopid+"' ;";
			sql.query(final , function(err2,res2) {
				if(err2) result(true,{"success":false,"message":"Something went completely wrong!"});
				else {
					 if(!res2.affectedRows) {
						//console.log(res2);
						console.log("Shop to delete does not exist !");
						result(null,{"sucess":false,"message":"Shop id does not exist in database !"});
					 }
					 else {
						console.log("Shop with id "+shopid+" has been deleted !");
					 	result(null,{"success":true,"message":"OK"});
					}
				}
			});
		}
	});


};

module.exports= removeshop;
