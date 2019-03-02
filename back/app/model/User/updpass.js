'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');

updatepass = function(oldpsswd,newpsswd,usrid,result){


	sql.query("SELECT psswd FROM users WHERE userid = ? LIMIT 1" , usrid , function (erru,resu) {

		if(!resu[0]) result(null,{"success":false,"message":"Invalid userid!"});
		
		else {

			if(bcrypt.compareSync(oldpsswd, resu[0].psswd)) {

				let hash = bcrypt.hashSync(newpsswd, 10);

				final ="UPDATE users SET psswd = '"+hash+"' WHERE userid = '"+usrid+"' ; ";  

				sql.query(final ,function (err, res) {

					if(err) {

						console.log("error: ", err);
						result(true,{"success":false,"message":err});
					}

					else {
						result(null, {"success":true,"message":"Password update completed!"});
					}

				}); 

			}
			else result(null,{"success":false,"message":"Old password is incorrect,authentication failed !"})
		}

	});

	

};

module.exports= updatepass;
