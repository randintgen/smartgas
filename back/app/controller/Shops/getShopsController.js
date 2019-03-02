'use strict';

const checks = require("../utils.js");

var getem = require('../../model/Shops/getShopsModel.js');

exports.view_shops = function(req, res) {

  if (req.query.format && req.query.format != "json") {
    res.status(400).json({"success":false, "message":"Unsupported format !"});
  }
  else if(req.query.start && checks.checkInt(Number(req.query.start))) {
    res.status(400).json({"success":false,"message":"Start variable must be a non negative integer !"});
  }
  else if(req.query.count && (checks.checkInt(Number(req.query.count)) || Number(req.query.count) == 0)) {
    res.status(400).json({"success":false,"message":"Count variable must be a positive integer !"});
  }
  else if(req.query.status && !(req.query.status == "ALL" || req.query.status == "WITHDRAWN" || req.query.status == "ACTIVE")) {
    res.status(400).json({"success":false,"message":"Status variable must be ACTIVE or WITHDRAWN or ALL !"});
  }
  else if(req.query.sort && !(req.query.sort == "id|DESC" || req.query.sort == "id|ASC" || req.query.sort == "name|ASC" || req.query.sort == "name|DESC")) {
    res.status(400).json({"success":false,"message":"Sort variable must be id|DESC or id|ASC or name|ASC or name|DESC !"});
  }
  else {
    // checks ok

    var start = 0;
  	var count = 20;
  	var status = "ACTIVE";
  	var sorting = "id|DESC";

    if (req.query.start) start = Number(req.query.start);
    if (req.query.count) count = Number(req.query.count);
    if (req.query.status) status = req.query.status;
    if (req.query.sort) sorting = req.query.sort;


    getem(start,count,status,sorting,function (err,shop) {

      if (err) res.status(400).json(shop);
      else {
        if (res.success == false) res.status(404).json(shop);
        else res.json(shop);
      }

    });
  }
};
