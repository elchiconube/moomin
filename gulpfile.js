var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  pug = require('gulp-pug'),
  plumberNotifier = require('gulp-plumber-notifier'),
  imagemin = require('gulp-imagemin'),
  data = require('gulp-data'),
  fs = require('fs'),
  path = require('path'),
  merge = require('gulp-merge-json');

// Declare Languages
var langs = ['es', 'en']

gulp.task('default', ['data', 'css', 'js', 'sw', 'views', 'fonts', 'manifest', 'images'], () => {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch("src/data/**/*.json}", ['data']);
  gulp.watch("src/fonts/*}", ['fonts']);
  gulp.watch("src/scripts/sw/*.js", ['sw']);
  gulp.watch("src/scripts/**/*.js", ['js']);
  gulp.watch("src/scss/**/*.scss", ['css']);
  gulp.watch("src/views/**/*.pug", ['views']);
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});

gulp.task('data', () => {
  return gulp.src('src/data/**/*.json')
    .pipe(merge({
      fileName: 'data.json',
      edit: (json, file) => {
        // Extract the filename and strip the extension
        var filename = path.basename(file.path),
          primaryKey = filename.replace(path.extname(filename), '');

        // Set the filename as the primary key for our JSON data
        var data = {};
        data[primaryKey.toUpperCase()] = json;

        return data;
      }
    }))
    .pipe(gulp.dest('src/data/'));
});

gulp.task('fonts', () => {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('views', ['data'], () => {

  var firstLang = true
  langs.forEach(function (lang) {
    if (!firstLang) {
      gulp.src('src/views/pages/*.pug')
        .pipe(plumberNotifier())
        .pipe(data((file) =>
          JSON.parse(fs.readFileSync('src/data/data.json'))
        ))
        .pipe(pug({
          pretty: false,
          data: {
            lang: lang
          }
        }))
        .pipe(gulp.dest('dist/' + lang + '/'))
    } else {
      gulp.src('src/views/pages/*.pug')
        .pipe(plumberNotifier())
        .pipe(data((file) =>
          JSON.parse(fs.readFileSync('src/data/data.json'))
        ))
        .pipe(pug({
          pretty: true,
          data: {
            lang: lang
          }
        }))
        .pipe(gulp.dest('dist/'))

    }
    firstLang = false
  });


});

gulp.task('images', () =>
  gulp.src('src/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img/'))
);

gulp.task('sw', () => {
  gulp.src('src/scripts/sw/*.js')
    .pipe(plumberNotifier())
    .pipe(gulp.dest('dist/'))
});

gulp.task('manifest', () => {
  gulp.src('src/manifest.json')
    .pipe(plumberNotifier())
    .pipe(gulp.dest('dist/'))
});

gulp.task('js', () => {
  gulp.src('src/scripts/app.js')
    .pipe(plumberNotifier())
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('css', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumberNotifier())
    .pipe(sass({
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('src/data/**/*.json', [data])
  gulp.watch('src/fonts/*', [fonts])
  gulp.watch('src/scripts/sw/*.js', [sw]);
  gulp.watch('src/scripts/**/*.js', [js]);
  gulp.watch('src/scss/**/*.scss', [css]);
  gulp.watch('src/views/**/*.pug', [views]);
});

gulp.task('build', ['data', 'css', 'js', 'sw', 'views', 'fonts', 'images', 'manifest'], () => {

});