'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(require('yosay')("Bem-vindo ao NH Sass Generator"));
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
    this.mkdir('css');
    this.directory('sass', 'sass');

    this.template('brand.scss', 'sass/output/brand.scss', this);


    for(var i = 0, j = this.modules.length; i < j; i++) {
      this.template('module.scss', 'sass/source/modules/_' + this.modules[i] + '.scss', { moduleName: this.modules[i] });
    }
  },

  git: function () {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function () {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {
          bourbon: "~4.0.2",
      }
    };

    this.copy('bowerrc', '.bowerrc');
    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  editorConfig: function () {
    this.copy('editorconfig', 'sass/.editorconfig');
  },

  install: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.bowerInstall();
      }
    });
  }
});
