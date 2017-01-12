'use strict';
/* jshint node: true */
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-convert');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-yamllint');
    grunt.initConfig({
        jshint : {
            files : [ '*.js', 'routes/*.js', 'services/*.js', 'tests/*.js' ]
        },
        yamllint: {
            all: ['api/swagger/swagger.yaml']
        },
        clean : [ 'public', 'dist', ],
        convert: {
            yml2json: {
                src: ['api/swagger/swagger.yaml'],
                dest: 'swagger.json'
                }
        },
        nodemon : {
            dev : {
                script : 'server.js'
            }
        },
        'copy' : {
            main : {
                files : [ {
                    expand : true,
                    cwd : 'node_modules/swagger-ui/dist/',
                    src : [ '**' ],
                    dest : 'public/api/'
                }, {
                    expand : true,
                    src : [ 'swagger.json' ],
                    dest : 'public/api/'
                } ]
            }
        },
        'string-replace': {
            inline: {
              files: {
                  'public/api/index.html': 'public/api/index.html',
              },
              options: {
                replacements: [
                  // place files inline example
                  {
                    pattern: 'http://petstore.swagger.io/v2/swagger.json',
                    replacement: 'swagger.json'
                  }
                ]
              }
            }
          },
        mochaTest : {
            test : {
                options : {
                    reporter : 'spec',
                    timeout: 10000
                },
                src : [ 'tests/unit-test/*.test.js' ]
                
            }
        }
    });
    var finalTaskList = [ "jshint", "mochaTest:test" ];
    var docTaskList = ['yamllint','convert', 'copy','string-replace' ];
    grunt.registerTask('default', finalTaskList);
    grunt.registerTask('docs',docTaskList);
};
