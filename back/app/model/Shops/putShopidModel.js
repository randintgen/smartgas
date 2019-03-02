'user strict';

const getem =require('./getShopidModel.js');
const sql = require('../db.js');

var Shopup = function(product) {

	this.name = product.name;
	this.lng = product.lng;
	this.lat = product.lat;
	this.tags = product.tags;
	//this.withdrawn = product.withdrawn;
	this.address = product.address;
	//this.imgpath = product.ipath;

};


Shopup.update_shop = function(newproduct,id,result) {

	var temp,tagsplit;
	var todo = "UPDATE shops set ? WHERE shopid="+id ;
	sql.query(todo,newproduct,function (err, res) {

		if(err) {

			console.log("error in update shop : ", err);
	        	result(true,{"success":false,"message":"Something went wrong,please try again later !"});
		}

		else {
			if(!res.affectedRows) {
				result(null,{"success":false,"message":"Shop id does not exist!"});
			}
			else {
	        		console.log("Shop with id "+id+" updated successfully !");
				getem(id,function(err2,res2) {
					result(err2,res2);
				});
			}

		}

	});
};

module.exports= Shopup;
