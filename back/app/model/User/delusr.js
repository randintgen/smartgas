'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');

remove = function(userid,pswd,result){

	sql.query("SELECT username,psswd FROM users WHERE userid = ? LIMIT 1" , userid , function(err1,resp) {
	
		if(!resp[0]) result(true,{"success":false,"message":"Invalid userid!"});

		else {
			if(bcrypt.compareSync(pswd, resp[0].psswd)) {

				sql.query("DELETE FROM users WHERE userid = ?", userid, function (err, res) {

					if(err) {

						console.log("error: ", err);
						result(null,{"success":false,"message":err});
					}

					else {
						console.log("User " +resp[0].username+ " deleted !");
						result(null,{"success":true,"message":"We will miss you "+ resp[0].username});
					}
				}); 
			}

			else result(null,{"success":true,"message":"Invalid password !"});
		}
	});
};

module.exports= remove;
