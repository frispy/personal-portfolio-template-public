// const fileinclude = require('gulp-file-include')

// const imagemin = require('gulp-imagemin');

// const autoPrefixer = require('gulp-autoprefixer')

let project_folder = "build"
let source_folder = "src"

// работа gulp с файловой системой
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!"+source_folder+ "/_*.html"], // тут же есть исключение файлов с "_", которые при компиляции не нужны
        css: source_folder + "/scss/*.scss",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: {
        html: source_folder+ "/**/*.html",
        css: source_folder+ "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./"+ project_folder + "/"

}

// подключение плагинов
let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default // сжатие js
    // imagemin = require("gulp-imagemin")
    // webp = require('gulp-webp')


// параметры для браузера
function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port:3000,
        notify:false
    })

}

// удаление файлов с build

function clean(params) {
    return del(path.clean);
}

// обновление файла вживую

function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

// работа с html 

function html() {
    return src(path.src.html)
        .pipe(fileinclude()) // fileinclude - сборка нескольких файлов в один
        .pipe(dest(path.build.html)) 
        .pipe(browsersync.stream())

}

function js() {
    return src(path.src.js)
        .pipe(fileinclude()) // fileinclude - сборка нескольких файлов в один
        .pipe(dest(path.build.js)) 
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js" // выходит два файла, min.js - сжатый, .js - не сжатый, подключать к html надо именно сжатый.
            })
        )
        .pipe(dest(path.build.js)) 
        .pipe(browsersync.stream())

}

// работа с картинками, конвертация в WEBP

function images() {
    return src(path.src.img)
        // .pipe(
        //     webp({
        //         quality: 80
        //     })
        // )
        // .pipe(dest(path.build.img))
        // .pipe(dest(path.src.img)) // код для webp 
        // .pipe(
        //     imagemin({
        //         progressive: true,
        //         svgoPlugins: [{removeViewBox: false}],
        //         interlaced: true,
        //         optimizationLevel: 2 // 0 to 7
        //     })
        // )
        .pipe(dest(path.build.img)) 
        .pipe(browsersync.stream())

}


// работа с css (scss/sass)

function css() {
    return src(path.src.css)
        .pipe (
            scss({ outputStyle: 'expanded' }).on('error', scss.logError))
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserlist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css)) // компиляция
        .pipe(clean_css({level: 2}))
        .pipe(
            rename({
                extname: ".min.css" // выходит два файла, min.css - сжатый, .css - не сжатый, подключать к html надо именно сжатый.
            })
        )
        .pipe(dest(path.build.css)) // компиляция
        .pipe(browsersync.stream())

}

// fonts

function fonts(params) {
    src(path.src.fonts)
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}


let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.fonts = fonts 
exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch

