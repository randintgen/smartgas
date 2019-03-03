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

var newProduct = function(id,product) {
	this.id = id;
	this.name = product.type;
	this.description = product.description;
	this.category = product.category;
	this.tags = product.tags;
	this.withdrawn = product.withdrawn;
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
			var newpr = new newProduct(res.insertId,newproduct);
			//console.log(newpr.id);

			newpr.id = ""+newpr.id;

			if(newpr.withdrawn==0) newpr.withdrawn=false
			else newpr.withdrawn=true

			tagsplit = newpr.tags.split(',');
			//console.log(tagsplit);
			temp = [];
			for(var j=0 ; j<tagsplit.length ; j++){
				temp.push(tagsplit[j]);
			}
			newpr.tags = temp;
			//console.log(newpr);
			if(newpr.tags[0]==""&&newpr.tags.length==1){
				newpr.tags=[]
			}
	        	result(null, {"success":true,"product":newpr});

		}

	});
};

module.exports= Product;
