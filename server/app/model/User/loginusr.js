'user strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('../db.js');

login = function(username,pswd,result) {


	sql.query("SELECT psswd,userid FROM users WHERE username = ? LIMIT 1" , username , function(err1,resp) {
		
		//console.log(resp[0]);

		if(!resp[0]) result(true,{"success":false,"message":"Invalid username!"});

		else {

			if(bcrypt.compareSync(pswd, resp[0].psswd)) {

				console.log("User " + username + " logged in !");
				const body = {_id : resp[0].userid};
				const token = jwt.sign({user : body},'top_secret',{expiresIn: '2h'});

				result(null,{'success': true,'message':"User "+username+" succesfully logged in !",'token':token});

			}

			else result(null,{'success':false,'message':"Invalid password !"});
		}
	});
};

module.exports= login;
