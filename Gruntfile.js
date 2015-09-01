module.exports = function(grunt) {
    'use strict';

    var remapify = require('remapify'); // browserify path aliasing

    grunt.initConfig({

        //-- paths

        src_path: 'src',
        dist_path: 'public',
        test_path: 'test',
        // cdn_path: '',
        
        //-- package reference

        pkg: grunt.file.readJSON('package.json'),

        //-- task configuration

        //--------------------
        // Clean
        // remove directories/files
        //--------------------

        clean: {
            main: '<%= dist_path %>'
        },

        //--------------------
        // Copy
        // copy source files into another directory
        //--------------------

        copy: {
            main: {
                expand: true,
                cwd: '<%= src_path %>',
                src: [
                    '*',
                    'images/*',
                    'styles/fonts/**/*'
                ],
                dest: '<%= dist_path %>',
                filter: 'isFile',
                dot: true
            },
            html: {
                expand: true,
                cwd: '<%= src_path %>',
                src: [
                    '*.html'
                ],
                dest: '<%= dist_path %>',
                filter: 'isFile',
                dot: true
            },
        },

        //--------------------
        // SASS
        // compiles sass
        //--------------------

        sass: {
            dev: {
                options: { 
                    style: 'expanded',
                    quiet: true
                },
                files: {
                    '<%= dist_path %>/styles/all.css': '<%= src_path %>/styles/all.scss'
                }
            },
            dist: {
                options: { 
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= dist_path %>/styles/all-<%= pkg.version %>.css': '<%= src_path %>/styles/all.scss'
                }
            }
        },

        //--------------------
        // HTML Build
        // dynamically build source file links into html blocks
        //--------------------

        htmlbuild: {
            main: {
                src: '<%= dist_path %>/index.html',
                dest: '<%= dist_path %>',
                options: {
                    /**
                     * the below 'relative' configuration should work, but there is a bug in grunt-html-build
                     * @issue https://github.com/spatools/grunt-html-build/issues/49
                    relative: true,
                    styles: {
                        all: '<%= dist_path %>/styles/*.css'
                    },
                    scripts: {
                        app: '<%= dist_path %>/scripts/*.js'
                    },
                    */
                    prefix: '/', // needed for HTML5 pushstate (non-relative paths)
                    styles: {
                        all: {
                            cwd: '<%= dist_path %>',
                            files: 'styles/*.css'
                        }
                    },  
                    scripts: {
                        app: {
                            cwd: '<%= dist_path %>',
                            files: 'scripts/*.js'
                        }
                    },
                    data: {
                        version: '<%= pkg.version %>'
                    }
                }
            }
        },

        //--------------------
        // imagemin
        // optimize images
        //--------------------

        imagemin: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= src_path %>/images',
                    src: [
                        '**/*.*{png,jpg,gif}'
                        // '!graphic_*/**/*'
                    ],
                    dest: '<%= dist_path %>/images'
                }]
            }
        },

        //--------------------
        // Uglify
        // compress/minify javascript
        //--------------------

        uglify: {
            options: {
                //compress: { drop_console: true }
            },
            main: {
                expand: true,
                cwd: '<%= dist_path %>/scripts',
                src: ['*.js'],
                dest: '<%= dist_path %>/scripts'
            }
        },

        //--------------------
        // JSHint
        // linting
        //--------------------

        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                forin: true,
                latedef: true,
                nonbsp: true,
                undef: true,
                unused: true,
                browserify: true,
                mocha: true
            },
            main: '<%= src_path %>/app/**/*.js'
        },

        //--------------------
        // Browserify
        // package js files for browser
        //--------------------

        browserify: {
            options: {
                alias: {},
                plugin: [
                    [
                        'remapify', [{
                            src: './**/*',  // glob for the files to remap
                            expose: './', // this will expose `__dirname + /client/views/home.js` as `views/home.js`
                            cwd: __dirname + '/src/app'  // defaults to process.cwd()
                        }]
                    ]
                ],
                transform: [
                    ['node-underscorify', {
                        'extensions': ['html']
                    }]
                ]
            },
            dev: {
                files: { '<%= dist_path %>/scripts/app.js': ['<%= src_path %>/app/**/*'] },
                options: { 
                    // uses "watchify" rather than browserify (much faster)
                    // browserify watch handles its own bundle, so grunt watch does not watch these js/hbs files
                    // works concurrently with grunt watch
                    watch: true,
                    browserifyOptions: { 
                        debug: true 
                    } 
                }
            },
            dist: {
                files: { '<%= dist_path %>/scripts/app-<%= pkg.version %>.js': ['<%= src_path %>/app/**/*'] }
            }
        },

        //--------------------
        // Mochify
        // unit tests compiled with browserify
        //--------------------

        mochify: {
            options: {
                reporter: 'spec'
            },
            main: {
                src: ['<%= test_path %>/**/*.js']
            }
        },

        //--------------------
        // Watch
        // run tasks in response to file changes
        //--------------------
        
        watch: {
            options: {
                interrupt: true
            },
            // each watch target has a specific filetype to watch
            // so only the necessary tasks needed for recompile to public are run
            css: { 
                files: ['<%= src_path %>/styles/**/*.scss'],
                tasks: ['sass:dev']
            },
            html: { 
                files: ['<%= src_path %>/*.html'],
                tasks: ['copy:html', 'htmlbuild']
            }
        },

        //--------------------
        // Connect
        // webserver
        //--------------------

        connect: {
            main: {
                options: {
                    base: '<%= dist_path %>',
                    port: 8000
                }
            },
            dist: {
                options: {
                    keepalive: true,
                    base: '<%= dist_path %>',
                    port: 8000
                }
            }
        }

    });

    //-- load grunt tasks

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mochify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    //-- task registration

    //--------------------
    // Test tasks ($ grunt test)
    //--------------------

    grunt.registerTask('test', [
        'mochify'
    ]);

    //--------------------
    // Development tasks ($ grunt)
    //--------------------

    grunt.registerTask('default', [
        'clean',  
        'copy:main',  
        'sass:dev',
        'jshint',
        'browserify:dev',
        'htmlbuild',
        'connect:main',
        'watch'
    ]);

    //--------------------
    // Development tasks ($ grunt dist)
    //--------------------

    grunt.registerTask('dist', [
        'clean',
        'copy:main',
        'sass:dist',
        'jshint',
        'browserify:dist',
        'uglify',
        'imagemin',
        'htmlbuild',
        'connect:dist'
    ]);

};







