'user strict';

const jwt = require('jsonwebtoken');
const config = 'top_secret';
const redis = require('redis');


// function returns error if no token was provided
// function returns false as result if token was provided but user authentication failed
// function returns true as result if token was provided and user authentication succeeded
// so at first error should be checked , if error is null then proceed to result

authenticate = function(req,result) {
 	
	let token = req.headers['x-observatory-auth']; 
	//console.log(req.headers)
	
  	if (token) {

  		if (token.startsWith('Bearer ')) {
    			// Remove Bearer from string
    			token = token.slice(7, token.length);
  		}

    		jwt.verify(token, config, (err, decoded) => {

      			if (err) {

				result(null,false,null);

      			} 

      			else {

				var client = redis.createClient();

				client.get('blacklist:'+decoded.user.jwtid, function(error, res2) {
					

  					if (error || res2!=null) { 

						//console.log(error);
						client.quit(redis.print);
						result(null,false,null);
						
					}

					else {
						client.quit(redis.print);
						result(null,true,decoded.user._id);
					}

				});
			
      			}

    		});

  	}

	else {
		result(true,null,null)
	}
 
  
};

module.exports = authenticate ;
