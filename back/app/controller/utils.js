// simple functions for the controllers to check inputs

// check input is a non negative integer number with value less than maximum | should be used for id checking
var checkInt = function (input) {
    if (!Number.isInteger(input) || input > 2147483647 || input < 0) return true;
    else return false;
};

// check date has correct form, return true if bad format, else false
var checkDate = function (mystring) {
    var re = /\d\d\d\d-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])/; // regular expression to match required date format
    return !re.test(mystring);
};

// true if from later than to, checks datefrom is not later than dateto
var compDate = function (from, to) {
    var r1 = from.split("-");
    var r2 = to.split("-");
    var df = new Date(r1[0], r1[1], r1[2]);
    var dt = new Date(r2[0], r2[1], r2[2]);
    return (df.getTime() > dt.getTime());
};


// check geoLng, geoLat has correct form, return true if bad format, else false
var checkGeo = function (lat, lng) {
    if (isNaN(Number(lat)) || isNaN(Number(lng))) return true;
    if (Number(lat) > 180 || Number(lat) < -180) return true;
    if (Number(lng) > 90 || Number(lng) < -90) return true;
    return false;
};

module.exports = {checkInt, checkDate, compDate, checkGeo};
