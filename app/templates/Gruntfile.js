module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= props.license %> */\n',
        // Task configuration
        sass: {
          dist: {
            options: {
              style: 'compressed',
              loadPath: 'sass/bower_components',
              sourcemap: 'inline',
              update: true,
              bundleExec: true
            },
            files: [{
              expand: true,
              cwd: 'sass/output',
              src: ['**/*.scss'],
              dest: 'css',
              ext: '.css'
            }]
          }
        },
        scsslint: {
          allFiles: [
            'sass/output/**/*.scss',
            'sass/source/**/*.scss'
          ],
          options: {
            bundleExec: false,
            colorizeOutput: true,
            config: '.scss-lint.yml',
            reporterOutput: 'scss-lint-report.xml'
          }
        },
        cmq: {
          options: {
            log: false
          },
          allFiles: {
            files: {
              'tmp': ['css/**/*.css']
            }
          }
        },
        watch: {
          sass: {
            files: 'sass/**/*.scss',
            tasks: ['sass', 'scsslint']
          }
        }
    });

    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('scss-lint', ['scsslint']);
};