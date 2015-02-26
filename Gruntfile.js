module.exports = function (grunt) {
        var webpack = require('webpack');

        grunt.initConfig({
            webpack: {
                options: {
                    progress: true,
                    resolve: {
                        modulesDirectories: ['node_modules', 'bower_components']
                    },
                    plugins: [
                        new webpack.ResolverPlugin([
                                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
                            ])
                    ]
                },
                build: {
                    entry: './s/index.js',
                    output: {
                        path: __dirname + '/release/',
                        filename: '[name].bundle.js'
                    }
                }
            },
            // 'webpack-dev-server': {
            //     options: {
            //         webpack: {

            //         }
            //     },
            //     start: {
            //         webpack: {

            //         }
            //     }
            // },

            watch: {
                scripts: {
                    files: ['./s/*.js', './s/*.html'],
                    tasks: ['webpack', 'copy', 'uglify'],
                    options: {
                        nospawn: true
                    }
                }
            },

            copy: {
                html: {
                    expand: true,
                    cwd: './s',
                    src: '**/*.html',
                    dest: './release'
                }
            },

            uglify: {
                dist: {
                    files: {
                        './release/main.bundle.min.js': './release/main.bundle.js'
                    }
                }
            }

        });

        grunt.loadNpmTasks('grunt-webpack');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-uglify');
};
