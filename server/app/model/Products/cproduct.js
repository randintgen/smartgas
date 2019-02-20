'user strict';

const sql = require('../db.js');

var Product = function(product) {

	this.type = product.name;
	this.description = product.description;
	this.category = product.category;
	this.tags = product.tags;
	this.withdrawn = product.withdrawn;
	this.imgpath = product.ipath;

};


Product.create_product = function(newproduct,result) {

	var temp,tagsplit;

	sql.query("INSERT INTO fuel set ?", newproduct, function (err, res) {
               	 
		if(err) {

			console.log("error in new product : ", err);
	        	result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}

		else {
	        	console.log("New product created , fuelid -->  " + res.insertId );
			final = "SELECT fuelid as id ,type as name,description,category,tags,withdrawn FROM fuel WHERE fuelid="+res.insertId+" LIMIT 1 ;";
			sql.query(final,function(err2,res2) {
				if(err2) {
					console.log("error in new product : ", err2);
	        			result(true,{"success":false,"message":"Something went wrong,please try again later !"});
				}
				else {
					res2[0].id = ""+res2[0].id;

					if(res2[0].withdrawn==0) res2[0].withdrawn=false
					else res2[0].withdrawn=true

					tagsplit = res2[0].tags.split(',');
					temp = [];
					for(var j=0 ; j<tagsplit.length ; j++){
						temp.push(tagsplit[j]);
					}
					res2[0].tags = temp;
	        			result(null, {"success":true,"product":res2[0]});
				}
			});
		}

	}); 
};

module.exports= Product;

		
