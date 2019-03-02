'user strict';

const jwt = require('jsonwebtoken');
const kickout = require('../../model/User/logoutusr.js');

exports.logout_profile = function(req, res) {


	let token = req.headers['x-observatory-auth'];
	if(token) {

	  	if (token.startsWith('Bearer ')) {
    			// Remove Bearer from string
    			token = token.slice(7, token.length);
  		}

		jwt.verify(token, 'top_secret', (err, decoded) => {

      			if (err) res.status(403).json({"success":false,"message":"Authentication failed !"});

      			else {
				//console.log(decoded);
				kickout(decoded,token,function(error2,result2) {
					if(error2) res.status(400).json(result2);
					else res.json({"message":"OK"});
				});
			}



    		});
	}
	else res.status(400).json({"success":false,"message":"Please provide a valid authentication token !"});

};

