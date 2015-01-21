'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(yosay("Bem-vindo ao NH Sass Generator"));
    }

    var prompts = [{
      type: 'checkbox',
      name: 'modules',
      message: 'Quais módulos você gostaria de incluir inicialmente?',
      choices: [{
        name: 'Header',
        value: 'header',
        checked: true
      },
      {
        name: 'Footer',
        value: 'footer',
        checked: true
      },
      {
        name: 'Carousel',
        value: 'carousel',
        checked: true
      },
      {
        name: 'Slider',
        value: 'slider',
        checked: true
      },
      {
        name: 'Teaser',
        value: 'teaser',
        checked: true
      },
      {
        name: 'Grid',
        value: 'grid',
        checked: true
      }]
    }];

    this.prompt(prompts, function (answers) {
      this.modules = answers.modules;
      done();
    }.bind(this));
  },

  app: function () {
    this.directory('sass', 'sass');
    this.template('brand.scss', 'sass/output/brand.scss', this);

    for(var i = 0, j = this.modules.length; i < j; i++) {
      this.template('module.scss', 'sass/source/modules/_' + this.modules[i] + '.scss', { moduleName: this.modules[i] });
    }

    this.mkdir('css');
    this.write('Gemfile', 'gem "sass", "~>3.4.0"');
  },

  mercurial: function () {
    this.copy('hgignore', '.hgignore');
  },

  scsslint: function () {
    this.copy('scss-lint.yml', '.scss-lint.yml');
    this.write('scss-lint-report.xml', '');
  },

  grunt: function () {
    this.copy('package.json', 'package.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },

  bower: function () {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {
        bourbon: "~4.0.2"
      }
    };

    this.copy('bowerrc', '.bowerrc');
    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  install: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  }
});
