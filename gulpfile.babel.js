'use strict';

const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();
const htmlreplace = require('gulp-html-replace');
const fileinclude = require('gulp-file-include');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const browserify = require('gulp-browserify');
const replace = require('gulp-token-replace');

function browserReload(done) {
	server.reload();
	done();
}

function browserServe(done) {
	server.init({
		server: 'build',
    open: 'external'
	});
	done();
}

// Clean Build
function clean() {
	return del(['build']);
}

// Build Favicon & images
function img() {
	return src(['dev/favicon**',
				'dev/assets/img/**',
				'dev/assets/vid/**'
			], { base: './dev'})
			.pipe(dest('build'));
}

// htaccess, xml, humans & robots, etc
function otherFiles() {
	return src([
		'dev/.htaccess',
		'dev/humans.txt',
		'dev/robots.txt'
	])
	.pipe(dest('build'));
}

// Minify Image
function imgmin() {
	return src('dev/assets/img/*')
			.pipe(imagemin([
				imagemin.optipng({optimizationLevel: 8}),
				imagemin.svgo({
					plugins: [
						{removeViewBox: true},
						{cleanupIDs: false}
					]
				})
				]))
			.pipe(dest('build/assets/img'))
}

// JS Libraries
function jsLibs() {
	return src([
		'dev/assets/js/vendor/lib/*'
	])
		.pipe(dest('build/assets/js/lib'))
		.pipe(server.stream());
}

// PHP Libraries
function phpLibs() {
	return src([
		'dev/assets/php/**'
	])
		.pipe(dest('build/assets/php/'))
		.pipe(server.stream());
}

// Other files
function data() {
	return src([
		'dev/assets/data/**'
	])
	.pipe(dest('build/assets/data/'));
}

function jsConcat() {
	//jsLibs();
	return src([
		'dev/assets/js/imports.js',
		'dev/assets/js/swiper.js',
		'dev/assets/js/functions.js'
	])
	.pipe(maps.init())
	.pipe(concat('main.js'))
	.pipe(browserify({
		insertGlobals : true
	}))
	.pipe(maps.write('./'))
	.pipe(dest('build/assets/js'));
}

// JS Min
function jsMinify() {
	return src('build/assets/js/main.js')
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(dest('build/assets/js'));
}

// CSS SASS Compile
function cssCompile() {
	return src('dev/assets/css/main.scss')
	.pipe(maps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(maps.write('./'))
	.pipe(dest('build/assets/css'))
	.pipe(server.stream());
}

// CSS Min
function cssMinify() {
	return src('build/assets/css/main.css')
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(dest('build/assets/css'));
}

// HTML Compile
function htmlCompile(done) {
	var vars = require('./vars.js');
	src(['dev/*.html'
	])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: 'dev/inc/',
		indent: true
	}))
	.pipe(replace({global:vars}))
	.pipe(dest('build'));
	done();
}

// HTML Compile with minified sources
function htmlCompilemin(done) {
	var vars = require('./vars.js');
	src(['dev/*.html'
	])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: 'dev/inc/',
		indent: true
	}))
	.pipe(replace({global:vars}))
	.pipe(htmlreplace({
        'css': 'assets/css/main.min.css',
        'js': 'assets/js/main.min.js'
    }))
	.pipe(dest('build'));
	done();
}

// HTML CS JS HTML
function watchCssJsHtml() {
	watch('dev/assets/css/**/*.scss', cssCompile);
	watch('dev/assets/js/*.js', series(jsConcat, browserReload));
	watch(['dev/*.html', 'dev/inc/*.html'], series(htmlCompile, browserReload));
	watch('dev/assets/img/**', series(img, browserReload));
	watch('dev/assets/php/**', series(browserReload));
}

const js   = series(jsConcat, jsMinify);
const css  = series(cssCompile, cssMinify);
const html = htmlCompile;
const htmlmin = htmlCompilemin;
const watchFiles = watchCssJsHtml;
const ServeFiles = browserServe;
const build      = parallel(htmlmin, data, otherFiles, css, js, img);
const serveBuild = parallel(html, data, otherFiles, css, js, img);


exports.js      = series(jsConcat, jsMinify);
exports.css     = series(cssCompile, cssMinify);
exports.html    = htmlCompile;
exports.htmlmin = htmlCompilemin;
exports.clean   = clean;
exports.imgmin  = imgmin;
exports.build   = series(clean, parallel(htmlmin, data, otherFiles, css, js, img));
exports.serveBuild   = parallel(html, data, otherFiles, cssCompile, jsConcat, img);

exports.serve   = series(serveBuild, parallel(watchFiles, ServeFiles));
exports.default = build;