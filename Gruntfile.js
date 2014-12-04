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
                        filename: 'bundle.js'
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
                    files: ['**/*.js', '**/*.html'],
                    tasks: ['webpack', 'copy'],
                    options: {
                        spawn: false
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
            }
        });

        grunt.loadNpmTasks('grunt-webpack');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-copy');
};
