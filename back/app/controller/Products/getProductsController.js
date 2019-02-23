'use strict';

var getem = require('../../model/Products/getproducts.js');

exports.view_products = function(req, res) {

	var nogo = 0;
	var error ;
	var start = 0;
	var count = 0;
	var status = 0;
	var sorting = 0;

	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported !"});

	else {
		if(req.query.start && !((parseFloat(req.query.start)%1)===0)) res.status(400).json({"success":false,"message":"Start variable must be an integer !"});
		else if(req.query.count && !((parseFloat(req.query.count)%1)===0)) res.status(400).json({"success":false,"message":"Count variable must be an integer !"});
		else if(req.query.status && !(req.query.status=="ALL" || req.query.status=="WITHDRAWN" || req.query.status=="ACTIVE")) {
			res.status(400).json({"success":false,"message":"Status variable must be ACTIVE or WITHDRAWN or ALL !"});
		}
		else if(req.query.sort && !(req.query.sort=="id|DESC" || req.query.sort=="id|ASC" || req.query.sort=="name|ASC" || req.query.sort=="name|DESC")) {
			res.status(400).json({"success":false,"message":"Sort variable must be id|DESC or id|ASC or name|ASC or name|DESC !"});
		}
		else {

			if(req.query.start) start = req.query.start;
			if(req.query.count) count = req.query.count;
			if(req.query.status) status = req.query.status;
			if(req.query.sort) sorting = req.query.sort;


			getem(start,count,status,sorting,function (err,usr) {
   	
    				if (err) res.status(400).json(usr);
				else {
					res.json(usr);
				}

  			}); 
		}
	}
};
