'user strict';

const getem =require('./getid.js');
const sql = require('../db.js');

var Productup = function(product) {

	this.type = product.name;
	this.description = product.description;
	this.category = product.category;
	this.tags = product.tags;
	//this.withdrawn = product.withdrawn;
	//this.imgpath = product.ipath;

};


Productup.update_product = function(newproduct,id,result) {

	var temp,tagsplit;
	var todo = "UPDATE fuel set ? WHERE fuelid="+id ;
	sql.query(todo,newproduct,function (err, res) {
               	 
		if(err) {

			console.log("error in update product : ", err);
	        	result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}

		else {
			if(!res.affectedRows) { 
				result(null,{"success":false,"message":"Product id does not exist!"});
			}
			else {
	        		console.log("Product with id "+id+" updated successfully !");
				getem(id,function(err2,res2) {
					result(err2,res2);
				});
			}

		}

	}); 
};

module.exports= Productup;

