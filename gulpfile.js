// npm i gulp gulp-multi-process
// gulp
//-----------------------------------------------------------------------------------//

var gulp = require('gulp');
var exec = require('child_process').exec;
var gulpMultiProcess = require('gulp-multi-process');

gulp.task('install_back', function(cb) {
    process.chdir('./back');
    var npm = require("npm");
    npmConfig = {};
    npm.load(npmConfig, function (er) {
        if (er) return cb(er);
        npm.commands.install([], function (er, data) { cb(er); });
        npm.on("log", function (message) { console.log(message); });
    });
});

gulp.task('install_front', function(cb) {
    process.chdir('./front');
    var npm = require("npm");
    npmConfig = {};
    npm.load(npmConfig, function (er) {
        if (er) return cb(er);
        npm.commands.install([], function (er, data) { cb(er); });
        npm.on("log", function (message) { console.log(message); });
    });
});

gulp.task('init_db', function (cb) {
  process.chdir('./back');
  exec('mysql -uroot -pkwdikosmysql < crowd.sql', function (err, stdout, stderr) {
        console.log(stdout);
    cb(err);
  });
});

gulp.task('test', function(cb) {
    var npm = require("npm");
    npmConfig = {};
    npm.load(npmConfig, function (er) {
        if (er) return cb(er);
        npm.commands.run(["test"], function (er, data) { cb(er); });
        npm.on("log", function (message) { console.log(message); });
    });
});
/*
gulp.task('waiting', function (cb) {
  process.chdir('../back');
  exec('sleep 3', function (err, stdout, stderr) {
        console.log(stdout);
    cb(err);
  });
});
*/
gulp.task('back_server', function (cb) {
  process.chdir('./back');
  var npm = require("npm");
  npmConfig = {};
  npm.load(npmConfig, function (er) {
      if (er) return cb(er);
      npm.commands.start([], function (er, data) { cb(er); });
      npm.on("log", function (message) { console.log(message); });
  });
});

gulp.task('front_server', function (cb) {
  process.chdir('./front');
  var npm = require("npm");
  npmConfig = {};
  npm.load(npmConfig, function (er) {
      if (er) return cb(er);
      npm.commands.start([], function (er, data) { cb(er); });
      npm.on("log", function (message) { console.log(message); });
  });
});

gulp.task('installs', function(cb) {
  // task1 and task2 will run in different processes
  return gulpMultiProcess(['install_back', 'install_front'], cb);
});

gulp.task('initializations', gulp.series('installs','init_db','test'/*,'waiting'*/));
//gulp.task('servers', gulp.parallel('back_server','front_server'));

gulp.task('servers', function(cb) {
  // task1 and task2 will run in different processes
  return gulpMultiProcess(['back_server', 'front_server'], cb);
});

gulp.task('default',gulp.series('initializations','servers'));
//gulp.task('default',gulp.series('install_front','front_server'));

/*
var nodemon = require('gulp-nodemon')
gulp.task('back_server', function (done) {
  //process.chdir('../back');
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  , done: done
  })
})

gulp.task('servers', function (cb) {
  process.chdir('./back');
  exec('npm start & npm start --prefix ../front', function (err, stdout, stderr) {
    console.log(stdout);
    cb(err);
  });
});

// ['cd back','npm start & npm start --prefix ../front']
*/