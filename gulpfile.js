var path   = require('path');
var gulp   = require('gulp');
var watch  = require('gulp-watch');
var sass   = require('gulp-sass');
var jade   = require('gulp-jade');
var notify = require('gulp-notify');

var config = {
  destPath: './public',
   sassPath: './sass',
  htmlTemplatePath: './template',
   bowerPath: './bower_components' 
}

gulp.task('jade', function() {
  gulp.src(path.join(config.htmlTemplatePath, '**/*.jade'))
    .pipe(jade())
    .pipe(gulp.dest(config.destPath))
    .pipe(notify('Done jade to html'));
});

gulp.task('css', function() {
  gulp.src([
      path.join(config.sassPath, '**/*.scss'),
      path.join(config.bowerPath, 'fontawesome/scss/font-awesome.scss')])
    .pipe(sass({ style: 'compressed' }) .on("error", notify.onError(function (error) { return "Error: " + error.message; })))
    .pipe(gulp.dest(path.join(config.destPath, 'css')))
    .pipe(notify('Done sass to css'));
});

gulp.task('icons', function() {
  gulp.src(path.join(config.bowerPath, 'fontawesome/fonts/*.*') )
    .pipe(gulp.dest(path.join(config.destPath, 'fonts')))
    .pipe(notify('Done font copy'));
});

gulp.task('lib', function() {
  gulp.src([
      path.join(config.bowerPath, 'bootstrap/dist/css/bootstrap.min.css'),
      path.join(config.bowerPath, 'bootstrap/dist/css/bootstrap-theme.min.css'),
      path.join(config.bowerPath, 'fontawesome/css/font-awesome.min.css')
    ])
    .pipe(gulp.dest(path.join(config.destPath, 'lib/css')));

  gulp.src([
      path.join(config.bowerPath, 'bootstrap/dist/js/bootstrap.min.js'),
      path.join(config.bowerPath, 'jquery/dist/jquery.min.js'),
      path.join(config.bowerPath, 'fabric/dist/fabric.min.js')
    ])
    .pipe(gulp.dest(path.join(config.destPath, 'lib/js')));
});

gulp.task('watch', function() {
  gulp.watch(path.join(config.htmlTemplatePath, '**/*.jade'), function() {
    gulp.start('jade');
  });

  gulp.watch([
      path.join(config.sassPath, '**/*.sass'),
      path.join(config.bowerPath, 'fontawesome/scss/*.scss')
    ], function() {
      gulp.start('css');
    }); 
});

gulp.task('build', ['jade', 'css', 'icons', 'lib']);

gulp.task('default', function() {

});
