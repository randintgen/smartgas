'use strict';

var getem_id = require('../../model/Products/getid.js');

exports.view_pid = function(req, res) {


	if(req.query.format=="xml") res.status(400).json({"success":false,"message":"XML format is not supported !"});

	else {

		if(!((parseFloat(req.params.id)%1)===0)) res.status(400).json({"success":false,"message":"Product id given is not an integer !"});
		else if(req.params.id.length > 11) res.status(400).json({"success":false,"message":"Variable product id has exceeded maximum length !"});
		else {

			getem_id(req.params.id,function (err,usr) {
   	
    				if (err) res.status(400).json(usr);
				else {
					if(usr.success==true)res.json(usr.product);
					else res.status(404).json(usr);
				}

  			}); 
		}
	}
};
