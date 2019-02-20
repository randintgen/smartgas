'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');

remove = function(username,pswd,result){

	sql.query("SELECT psswd FROM users WHERE username = ? LIMIT 1" , username , function(err1,resp) {
	
		if(!resp[0]) result(true,{"success":false,"message":"Invalid username!"});

		else {

			if(bcrypt.compareSync(pswd, resp[0].psswd)) {

				sql.query("DELETE FROM users WHERE username = ?", username, function (err, res) {

					if(err) {

						console.log("error: ", err);
						result(null,{"success":false,"message":err});
					}

					else {
						console.log("User " +username+ " deleted !");
						result(null,{"success":true,"message":"We will miss you "+ username});
					}
				}); 
			}

			else result(null,{"success":false,"message":"Invalid password !"});
		}
	});
};

module.exports= remove;
