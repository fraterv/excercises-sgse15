//Packete die benoetigt werden, werden hier geladen.
var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	minifyhtml = require('gulp-minify-html'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	sass = require('gulp-sass'),
	autoprefix =require('gulp-autoprefixer'),
	header = require('gulp-header');



//Kopiert eine Datei
gulp.task('copy-html',function(){
	console.log("Kopiere eine HTML Datei!");
	gulp.src('./index.html')
	.pipe(gulp.dest('./copy/'));

});

//Kompression aller Bilder
gulp.task('image',function(){
	gulp.src('./img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./copy/img/'))
});

//Minifizierung von HTML
gulp.task('minifyhtml',function(){
	/*Optionen koennen gesetzt werden. Default sind alle false
	var opt = {
		conditionals:true,
		spare:true
	};
	*/

	gulp.src('./copy/index.html')
		//.pipe(minifyhtml(opt))
		.pipe(minifyhtml())
		.pipe(gulp.dest('./copy/html'))
});


//Ueberpruefung von javascript
gulp.task('checkjs',function(){
	gulp.src('./copy/*.js')
		.pipe(jshint())
		.pipe(gulp.dest('./copy/js'))
});

//compress and combine
gulp.task('compress_combine',function(){
	gulp.src('./copy/*.js')
		.pipe(uglify())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./copy/js'))
});

//babel nutzen um es6 nach js zu bauen
gulp.task('babel',function(){
	gulp.src('./copy/*.js')
	.pipe(babel())
	.pipe(gulp.dest('./copy/js'))
});

//sass nach css umwandeln
gulp.task('sass_to_css',function(){
	gulp.src('./copy/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./copy/css'))
});

//autoprefixer
gulp.task('autoprefixer',function(){
	gulp.src('./copy/css/sass_example.css')
	.pipe(autoprefix({
		browser:['last 2 version'],
		cascade: false
	}))
	.pipe(gulp.dest('./copy/css/new'))
});


//Header
gulp.task('header',function(){
	gulp.src('./copy/js/*.js')
	.pipe(header('Copyright by Michael, Philipp and Erwin\n'))
	.pipe(gulp.dest('./copy/js/new'))
});


//Kopiere alles in einem Ordner
gulp.task('upload',function(){
	gulp.src('./copy/**/*')
	.pipe(gulp.dest('./dest'))
});

//ueberwacht alle aenderungen
gulp.task('watch',function(){
	gulp.watch('./copy/*.js',['babel']);
	gulp.watch('./copy/js/*.js',['checkjs']);
	gulp.watch('./copy/*.scss',['sass_to_css']);
	gulp.watch('./copy/css/.css',['autoprefixer']);
});


//Standard Funktion von Gulp
gulp.task('default', ['copy-html','image', 'minifyhtml','checkjs',
	'compress_combine','babel','sass_to_css','autoprefixer','header','watch']);
