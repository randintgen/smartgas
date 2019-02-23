'use strict';

var Post = require('../../model/Posts/createPostModel.js');
var authenticate = require('../../auth/auth.js')

// check input is a positive integer number with length less than 11
function checkInt(input) {
    if (input.length > 11 || !Number.isInteger(input)) return true;
    else return (input < 1);
}

// check timestamp has correct form, return true if bad format, else false
function checkDate(mystring) {
    // regular expression to match required date format
    var re = /\d\d\d\d-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])/;
    return !re.test(mystring);
}

// true if from later than to, checks datefrom is not later than dateto
function compDate(from, to) {
    var r1 = from.split("-");
    var r2 = to.split("-");
    var df = new Date(r1[0], r1[1], r1[2]);
    var dt = new Date(r2[0], r2[1], r2[2]);
    return (df.getTime() > dt.getTime()); // probably works, should test
}

exports.create_post = function(req, res) {

  // console.log(req.body);
  // console.log(req.params.username);

  if (req.query.format && req.query.format != "json") {
    res.status(400).json({
      "success": false,
      "message": "Unsupported format !"
    });
  }
  else if (!req.body.price || !req.body.dateFrom || !req.body.dateTo || !req.body.productId || !req.body.shopId) {
    res.status(400).json({
      "success": false,
      "message": "Please complete all the mandatory fields !"
    });
  }
  else if (typeof req.body.price != "number" || (req.body.price <= 0) || checkInt(req.body.productId) || checkInt(req.body.shopId)) {
    res.status(400).json({
      "success": false,
      "message": "One or more fields are not valid !"
    });
  }
  else if (checkDate(req.body.dateFrom) || checkDate(req.body.dateTo)) {
    res.status(400).json({
      "success": false,
      "message": "Date must be in a valid form (YYYY-MM-DD) !"
    });
  }
  else if (compDate(req.body.dateFrom, req.body.dateTo)) {
    res.status(400).json({
      "success": false,
      "message": "dateFrom must not be later than dateTo !"
    });
  }
  else {

      // has passed checks, continue to sql queries and authenticate check
      authenticate(req,function(error,result,usrid) {

        if (error) {
          res.status(400).json({
            "success": false,
            "message": "Please provide a valid authentication token !"
          });
        }
        else {
          if (!result) {
            res.status(403).json({
              "success": false,
              "message": "Authentication failed !"
            });
          }
          else {

            var new_post = new Post(req.body);
            Post.createpost(new_post, usrid, function(err, post) {

              // console.log(err);
              // console.log(post);
              if (err) res.status(400).json(post);
              else {
                if (post.success == true) res.json(post);
                else res.status(400).json(post);
              }
            });
          }
        }
      });
  }
};

/*

  else if (req.body.price.length > 11 || req.body.productId.length > 11 || req.body.shopId.length > 11) {
    res.status(400).json({
      "success": false,
      "message": "One or more fields are not valid !"
    });
  }
  else if (isNaN(Number(req.body.price)) || isNaN(Number(req.body.productId)) || isNaN(Number(req.body.shopId))) {
    res.status(400).json({
      "success": false,
      "message":"One or more fields are not valid !"
    });
  }

*/
