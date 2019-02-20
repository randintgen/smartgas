'user strict';

const jwt = require('jsonwebtoken');
const config = 'top_secret';

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
			//console.log(decoded.user._id);
			result(null,true,decoded.user._id);
      		}

    		});

  	}
	else {
		result(true,null,null)
	}
 
  
};

module.exports = authenticate ;
