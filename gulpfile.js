const gulp       = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel');


gulp.task('babel', () =>
    gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('app/js'))
);
gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('img', function(){
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', function(cd){
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    }, cd);
});

gulp.task('watch:styles', function(){
    gulp.watch('app/sass/**/*.sass', gulp.series('sass'));
});

gulp.task('watch:code', function(){
    gulp.watch('app/*.html', gulp.series('reload'));
    gulp.watch('app/js/**/*.js', gulp.series('reload'));  
});

gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

gulp.task('clean', async function(){
    return del.sync('dist');
});

gulp.task('clearCache', async function(){
    return cache.clearAll();
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'scripts', 'watch:code', 'watch:styles'));

gulp.task('buildProject', async function(){
    const buildCss = gulp.src('app/css/main.css')
                    .pipe(cssnano())
                    .pipe(gulp.dest('dist/css'));
    
    const buildFonts = gulp.src('app/fonts/**/*')
                    .pipe(gulp.dest('dist/fonts'));

    const buildJs = gulp.src('app/js/**/*')
                    .pipe(babel({
                        presets: ['@babel/env']
                    }))
                    .pipe(gulp.dest('dist/js'));
    
    const buildHtml = gulp.src('app/*.html')
                    .pipe(gulp.dest('dist'));

    const buildFontAws = gulp.src('app/css/font-awesome.min.css')
                        .pipe(gulp.dest('dist/css'))
});

gulp.task('build', gulp.series('clean', 'img', 'sass', 'scripts', 'buildProject'));