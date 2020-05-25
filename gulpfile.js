const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglifyJs = require('gulp-uglify-es').default;
const uglifyCss = require('gulp-uglifycss');
const babel = require('gulp-babel');
const rename = require('gulp-rename');


function html(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
}

function fonts(){
  return gulp.src('src/assets/font/*.*')
    .pipe(gulp.dest('dist/assets/font'))
    .pipe(browserSync.stream());
}

function images(){
  return gulp.src('src/assets/images/*.*')
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(browserSync.stream());
}

function gulpSass(){
  return gulp.src('src/assets/css/**/*.scss')
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(autoprefixer({cascade: false}))
    .pipe(uglifyCss({}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

function gulpJS(){
  return gulp.src('src/assets/js/*.js')
    .pipe(concat('script.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglifyJs())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.stream());
}

function browser() {
  browserSync.init({
    server: "./dist"
  });
}

function gulpWatch(){
  gulp.watch('src/assets/css/**/*.scss', gulpSass);
  gulp.watch('src/assets/js/*.js', gulpJS);
  gulp.watch('src/*.html', html);
  gulp.watch('src/assets/font/*.*', fonts);
}

gulp.task('watch', gulpWatch);
gulp.task('html', html);
gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('sass', gulpSass);
gulp.task('minifyJS', gulpJS);
gulp.task('browser-sync', browser);

gulp.task('default', gulp.parallel('watch', 'html', 'fonts', 'images', 'sass', 'minifyJS' , 'browser-sync'));