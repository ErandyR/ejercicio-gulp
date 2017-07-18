var gulp = require('gulp');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


var rutas = {
    rutaJS: './src/assets/js/miGranJS.js',
    rutaSCSS: './src/assets/scss/main.scss',
    rutaHTML: 'index.html'
}

gulp.task('preparandoJS', function () {
    gulp.src(rutas.rutaJS)
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./public/js'))
});

gulp.task('preparandoCSS', function () {
    gulp.src(rutas.rutaSCSS)
        .pipe(sass({
                outputstyle: 'compressed',
                precision: 3
            })
         .on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
})

gulp.task('preparandoHTML', function(){
    gulp.src(rutas.rutaHTML)
        .pipe(gulp.dest('./public'))
});

gulp.task('watchChangesCSS', function () {
    browserSync.init({
        server: {
            basedir: './public'
        }
    })
    gulp.watch(rutas.rutaSCSS, ['sass-watch'])
    gulp.watch(rutas.rutaJS, ['js-watch'])
    gulp.watch(rutas.rutaHTML, ['html-watch'])
});

gulp.task('sass-watch', ['preparandoCSS'], function () {
    browserSync.reload();
});

gulp.task('js-watch', ['preparandoJS'], function(){
    browserSync.reload();
});

gulp.task('html-watch', ['preparandoHTML'], function(){
    browserSync.reload();
})

