'use strict';

var configure = function (gulp, config) {
    var gulpPlugins = require('gulp-load-plugins')(),
        argv = require('minimist')(process.argv.slice(2), {
            boolean: 'production'
        });

    var env = {
        production: argv.production,
        sourceMaps: !argv.production
    };

    require('gulp-help')(gulp);

    if (config.styles) {
        gulp.task('styles', 'Build stylesheets', function () {
            for (var i = 0; i < config.styles.length; i++) {
                var thisBuild = config.styles[i];

                gulp.src(thisBuild.src)
                    .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.init()))
                    .pipe(gulpPlugins.sassGlob())
                    .pipe(
                        gulpPlugins.sass({
                            includePaths: thisBuild.includePaths
                        }).on('error', gulpPlugins.sass.logError)
                    )
                    .pipe(
                        gulpPlugins.autoprefixer({
                            browsers: config.browsersList
                        })
                    )
                    .pipe(gulpPlugins.csso())
                    .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.write(thisBuild.sourcemaps)))
                    .pipe(gulp.dest(thisBuild.dest));
            }
        }, {
            aliases: ['stylesheets', 'css', 'scss']
        });
    }

    if (config.javascript) {
        gulp.task('javascript', 'Compile Javascript', function () {
            for (var i = 0; i < config.javascript.length; i++) {
                var thisBuild = config.javascript[i];

                gulp.src(thisBuild.src)
                    .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.init()))
                    .pipe(gulpPlugins.include())
                    .pipe(gulpPlugins.uglify())
                    .pipe(gulpPlugins.if(env.sourceMaps, gulpPlugins.sourcemaps.write(thisBuild.sourcemaps)))
                    .pipe(gulp.dest(thisBuild.dest));
            }
        }, {
            aliases: ['js']
        });
    }

    gulp.task('watch', 'Watch for changes', function() {
        if (config.styles) {
            for (var stylesCount = 0; stylesCount < config.styles.length; stylesCount++) {
                gulp.watch(config.styles[stylesCount].watch, ['styles']);
            }
        }

        if (config.javascript) {
            for (var jsCount = 0; jsCount < config.javascript.length; jsCount++) {
                gulp.watch(config.javascript[jsCount].watch, ['javascript']);
            }
        }
    });

    gulp.task('assets', 'Build all assets', function() {
        if (config.styles) {
            gulp.start('styles');
        }

        if (config.javascript) {
            gulp.start('javascript');
        }
    });

};

// Expose 'configure'
module.exports.configure = configure;
