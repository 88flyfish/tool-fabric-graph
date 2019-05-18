/**          
 ----------------------------------------------------------------
  请先npm install或则 yarn 安装依赖,依赖安装完 gulp 命令直接启动项目
 ----------------------------------------------------------------
*/
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),//less插件
    autoprefixer = require('gulp-autoprefixer'),//自动添加兼容前缀
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imgmin = require('gulp-imagemin'),
    connect = require('gulp-connect')//web服务器
    babel = require('gulp-babel');//ES6转ES5
    rename = require('gulp-rename'),

//css相关处理
gulp.task('cssHandle',function () {
	gulp.src('less/*.less').pipe(less()).pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true 
        })).pipe(gulp.dest('css'));
    gulp.src('less/*.less').pipe(less()).pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove:true //是否去掉不必要的前缀 默认：true 
        })).pipe(gulp.dest('css'));
});

//处理JS文件
gulp.task('scriptHandle',function () {
	gulp.src(['js/app/edit.js','js/app/result.js'])
        .pipe(babel({
                presets:['es2015']
            }))
        .pipe(rename({suffix: '.es5'}))
        .pipe(gulp.dest('js/app'));
});

//处理html
// gulp.task('htmlHandle',function () {
// 	var options = {
//         removeComments: true,//清除HTML注释
//         collapseWhitespace: true,//压缩HTML
//         collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
//         removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
//         removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
//         removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
//         minifyJS: true,//压缩页面JS
//         minifyCSS: true//压缩页面CSS
//     };
// 	gulp.src('src/html/*.html')
//         .pipe(htmlmin(options))
//         .pipe(gulp.dest('dest/html'));
//     gulp.src('src/*.html')
//         .pipe(htmlmin(options))
//         .pipe(gulp.dest('dest/'));
// });

//本地web服务器
gulp.task('server',function () {
	connect.server({
		root:'./',//配置默认目录
		port:8000,//端口号
        livereload:true//是否自动刷新,
        // host: '0.0.0.0'
	});
});

//刷新页面html
gulp.task('reload',function () {
	// gulp.src('dest/html/*.html').pipe(connect.reload());
    gulp.src('*.html').pipe(connect.reload());
});

//图片处理
// gulp.task('imgHandle',function () {
// 	gulp.src('img/*.{jpg,png,gif,ico}').pipe(imgmin()).pipe(gulp.dest('dest/images'));
// });

//定义文件监控模块
gulp.task('watch',function () {
	//第一个参数：锁定监控文件，第二个参数：当被监控的文件发生改变的时候，执行的相应模块
	gulp.watch('less/*.less',['cssHandle','reload']);
	gulp.watch('js/app/*.js',['scriptHandle','reload']);
	gulp.watch('*.html',['reload']);
	// gulp.watch('*.html',['htmlHandle','reload']);
});

//预处理相关
gulp.task('allHandle',['cssHandle','scriptHandle']);
gulp.task('default',['watch','server','allHandle']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 