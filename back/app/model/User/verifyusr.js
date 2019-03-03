'user strict';

const sql = require('../db.js');

verifyme = function(id,userid,result){

	sql.query("SELECT username,hashid FROM users WHERE userid = ? LIMIT 1" , userid , function(err1,resp) {
		if(!resp[0]) result(true,{"success":false,"message":"Invalid userid!"});

		else {
			//console.log(resp[0]);
			if(resp[0].hashid==id) {
				sql.query("UPDATE users SET flag = 1 WHERE userid = ? " , userid , function(err2,resp2) {
					if(err2) result(true,{"success":false,"message":"Something went wrong!"});
					else result(null,{"success":true,"message":"Welcome user "+resp[0].username+" !"});
				});
			}
			else result(true,{"success":false,"message":"Something went wrong!"});
		}
	});
};

module.exports= verifyme;
