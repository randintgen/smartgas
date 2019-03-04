/*--------------------------------INSTRUCTIONS---------------------------------------//
HOW TO :
-> install : npm i gulp gulp-cli gulp-multi-process npm
-> run     : $(npm bin)/gulp <task_name> (servers, installs, testing)
                                          by default does everything
-> if installed .bashrc, just run gulp <task_name>
//-----------------------------------------------------------------------------------*/

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
  // install_back and install_front will run in different processes
  return gulpMultiProcess(['install_back', 'install_front'], cb);
});

gulp.task('testing', gulp.series('init_db','test'));

gulp.task('initializations', gulp.series('installs','testing'));

gulp.task('servers', function(cb) {
  // back_server and front_server will run in different processes
  return gulpMultiProcess(['back_server', 'front_server'], cb);
});

gulp.task('default',gulp.series('initializations','servers'));


//--------------------------------------------------------------------------------//
/*
var nodemon = require('gulp-nodemon')
gulp.task('back_server', function (done) {
  process.chdir('./back');
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
