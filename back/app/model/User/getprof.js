'user strict';

const sql = require('../db.js');

get_pid = function(username,result) {

	var final;
	final = "SELECT userid as id ,mail,username,nposts,reputation,ipath FROM users WHERE username='"+username+"' LIMIT 1 ;";
	console.log(final);
	sql.query(final,function (err, res) {

		if(err) {

			console.log("error: ", err);
			result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}
		else {
			//console.log(res);

			if(!res[0]) result(null,{"success":false,"message":"No matching user with the username given !"});
			else result(null,{"success":true,"user":res[0]});
		} 
	});
};

module.exports= get_pid;
