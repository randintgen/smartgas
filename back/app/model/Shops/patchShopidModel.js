'user strict';

const getem =require('./getShopidModel.js');
const sql = require('../db.js');

patch_prod = function(final,id,result) {


	sql.query(final, function(err,res) {

		if(err) {

			console.log("error in patch shop : ", err);
	        	result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}

		else {

			if(!res.affectedRows) {
				result(null,{"success":false,"message":"Shop id does not exist!"});
			}
			else {
				getem(id,function(err2,res2) {
					result(err2,res2);
				});
			}


		}
	});
};

module.exports= patch_prod;
