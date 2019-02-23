'user strict';

const redis = require('redis');

logout = function(decoded,token,result) {
	
	var client = redis.createClient();

	client.on('error', function(err){
  		console.log('Something went wrong ', err);
		result(true,{"success":false,"message":"Something went completely wrong !"});
	});

	var temp = "blacklist:"+decoded.user.jwtid;

	client.set(temp,token,'EX',7200,function(err2,res2) {

		if(err2) {
			console.log(err2); 
			client.quit();
			result(true,{"success":false,"message":"Something went completely wrong !"});
		}
		else { 	
			console.log("Jwtid "+decoded.user.jwtid+" Blacklisted!");
			client.quit();
			result(null,{"success":true,"message":"OK"});
		}
	});	
	
	
};

module.exports= logout;
