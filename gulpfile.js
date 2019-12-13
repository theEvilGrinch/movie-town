var gulp = require('gulp');
// var tinypng = require('gulp-tinypng');
var tinypngCompress = require('gulp-tinypng-compress');
var changed = require('gulp-changed');
var del = require('del');
var webp = require('gulp-webp');
var copy = require('gulp-contrib-copy');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');
var gcmq = require('gulp-group-css-media-queries');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var less = require('gulp-less');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var rsync = require('gulp-rsync');

///////////////////
//Задачи для HTML//
///////////////////
gulp.task('htmlmin', function () {
	return gulp.src([
		'./src/templates/AndrewTheme/*.tpl'
		])
	.pipe(changed('./dist/templates/AndrewTheme'))
	.pipe(htmlmin({
		collapseWhitespace: true,
		processScripts: ['application/ld+json'],
		minifyJS: true,
		cssmin: true
	}))
	.pipe(gulp.dest('./dist/templates/AndrewTheme'))
});
gulp.task('htmlminModules', function () {
	return gulp.src([
		'./src/templates/AndrewTheme/modules/*'
		])
	.pipe(changed('./dist/modules'))
	.pipe(htmlmin({
		collapseWhitespace: true,
		processScripts: ['application/ld+json'],
		minifyJS: true,
		cssmin: true
	}))
	.pipe(gulp.dest('./dist/modules'))
});

/////////////////////
//Задачи для стилей//
/////////////////////
gulp.task('style', function () {
	return gulp.src([
		"./node_modules/normalize.css/normalize.css",
		"./src/templates/AndrewTheme/less/my_styles.less",
		"./node_modules/lightbox2/dist/css/lightbox.css"
		])
	.pipe(less())
	.pipe(concat('style.css'))
	.pipe(gcmq())
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest("./dist/templates/AndrewTheme"));
});

///////////////////////
//Задачи для скриптов//
///////////////////////
gulp.task('uglify', function (cb) {
	pump([gulp.src([
		"./src/templates/AndrewTheme/js/myScripts.js",
		"./src/templates/AndrewTheme/js/ya-share.js",
		"./node_modules/lazysizes/lazysizes.js"
		]),
	concat('script.js'),
	uglify(),
	gulp.dest('./dist/templates/AndrewTheme/js')
	],
	cb);
});
gulp.task('uglifyYo', function (cb) {
	pump([
		gulp.src("./src/templates/AndrewTheme/js/yohoho.js"),
		concat('yohoho.js'),
		uglify(),
		gulp.dest('./dist/templates/AndrewTheme/js')
		],
		cb);
});
gulp.task('uglifyLightbox', function (cb) {
	pump([gulp.src("./node_modules/lightbox2/dist/js/lightbox.js"),
		concat('lightbox.js'),
		uglify(),
		gulp.dest('./dist/templates/AndrewTheme/js')
		],
		cb);
});
//////////////////////////
//Задачи ДЛЯ ИЗОБРАЖЕНИЙ//
//////////////////////////
gulp.task('optimizeImg', function () {
	return gulp.src([
		'./src/films_src_data/films/**/*.png',
		'!./src/films_src_data/films/**/dirty/*',
		'!./src/films_src_data/films/.optimized'
		])
	.pipe(changed('./src/films_src_data/films/.optimized'))
	//
	// <-- NEW KEY --> .pipe(tinypngCompress({
	// 	key: 'bSBcYM96bZVNlGGzwp9VMkpbkQKX9bCy',
	// 	log: true
	// }))
	.pipe(tinypngCompress({
		log: true,
		key: '2opuzNRiqTgg6QcuDjRbdAiZDYMAKwbC'
	}))
	.pipe(gulp.dest('./src/films_src_data/films/.optimized'))
	.pipe(webp())
	.pipe(gulp.dest('./src/films_src_data/films/.optimized'));
});
gulp.task('copyOptimizedImg', function () {
	return gulp.src(['src/films_src_data/films/.optimized/**/*'])
	.pipe(copy())
	.pipe(gulp.dest('./dist/templates/AndrewTheme/images'));
});


////////////////////////////////////////
//<--Задачи для копирования Данных-->//
///////////////////////////////////////
gulp.task('copyRootData', function () {
	return gulp.src([
		'./src/**/*.{png,webp,php,png,gif,jpg,ico,svg,html,htm,woff2,ico,json,xml,txt,lng,tpl,css,js,webmanifest}',
		'!./src/templates/AndrewTheme/*.tpl',
		'!./src/templates/Default/**/*',
		'!./src/templates/AndrewTheme/js/*js',
		'!./src/films_src_data/**/*',
		'!./src/etc_src_data/**/*',
		'!./src/sql_bac/**/*'
		])
	.pipe(copy())
	.pipe(gulp.dest("./dist"));
});
gulp.task('copyHtaccess', function () {
	return gulp.src([
		'./src/**/.htaccess',
		'!./src/templates/Default/**/*',
		'!./src/etc_src_data/**/*'
		])
	.pipe(copy())
	.pipe(gulp.dest("./dist/"));
});

var exec = require('child_process').exec;

gulp.task('chmodDLE', function (cb) {
	exec('./src/etc_src_data/chmodDLE.sh', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

///////////////////////
//<--ЗАДАЧИ СБОРКИ-->//
///////////////////////
gulp.task('clearDist', function () {
	return del([
		'./dist/**/*',
		'!./dist/engine',
		'!./dist/backup',
		'!./dist/language',
		'!./dist/uploads',
		])
});
gulp.task('build', gulp.series([
	'clearDist',
	'htmlmin',
	'htmlminModules',
	'style',
	'uglify',
	'uglifyLightbox',
	'uglifyYo',
	'optimizeImg',
	'copyOptimizedImg',
	'copyRootData',
	'copyHtaccess',
	'chmodDLE'
	]));
///////////////////////
//ЗАДАЧИ ДЛЯ СЛЕЖЕНИЯ//
///////////////////////
gulp.task('watch', function () {
	browserSync.init({
		browser: "firefox-developer-edition",
		proxy: "https://movie-town.ru",
		files: [
		"./dist/templates/AndrewTheme/*.tpl",
		"./dist/templates/AndrewTheme/js/*.js",
		"./dist/templates/AndrewTheme/style.css"
		]
	});

	gulp.watch("./src/templates/AndrewTheme/*.tpl", gulp.series('htmlmin'));
	gulp.watch([
		"./node_modules/normalize.css/normalize.css",
		"./src/templates/AndrewTheme/less/*.less",
		"./node_modules/lightbox2/dist/css/lightbox.css"
		], gulp.series('style'));
	gulp.watch([
		"./src/templates/AndrewTheme/js/myScripts.js",
		"./src/templates/AndrewTheme/js/ya-share.js",
		"./node_modules/lightbox2/dist/js/lightbox.js",
		"./node_modules/lazysizes/lazysizes.js"
		], gulp.series('uglify'));
	gulp.watch("./src/templates/AndrewTheme/js/yohoho.js", gulp.series('uglifyYo'));
	gulp.watch("./src/templates/AndrewTheme/modules/*", gulp.series('htmlminModules'));
});
///////////
//DEPLOY//
//////////
gulp.task('ftpDeploy', function () {
	var conn = ftp.create({
		host: 'a306960.ftp.mchost.ru',
		port: '21',
		user: 'a306960_1',
		password: 'FdTJcxA7S8',
		parallel: 8,
		maxConnections: 10,
		// idleTimeout: 1000,
		log: gutil.log,
		secureOptions: { rejectUnauthorized: false }
	});
	var globs = [
	'dist/**/*',
	'dist/*'
	];
	return gulp.src(globs, {buffer: false})
	// .pipe(conn.dest('/httpdocs'));
	.pipe(conn.newer('/httpdocs'));
  // .pipe(conn.differentSize('/'));
});

gulp.task('rsyncDeploy', function() {
	return gulp.src([
		'dist/**'
		])
	.pipe(rsync({
		root: './dist',
		hostname: 'vh331440@vh331440.cp.eurobyte.ru',
		destination: './www/movie-town.ru',
		archive: true,
		silent: false,
		recursive: true,
		clean: true,
		// times: true,
		progress: true,
		command: true,
		compress: true
	}));
});

gulp.task('deploy', gulp.series(['build', 'rsyncDeploy']));