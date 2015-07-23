var root = process.cwd();

'use strict';

module.exports = {
  runner:{
    src:{
      html: 'test/runner.html',
      js: 'lib/**/*.js',
      test: 'test/spec/**/*js'
    }
  },
  lint:{
    all:['lib/**/*.js', 'test/**/*.js','build/**/*.js', '!node_modules/']
  },
  spec:{
    path:'test/spec/**/*.js',
    options:{
      ui:'bdd',
      growl: true,
      reporter:'spec'
    }
  },
  build:{
    path: root + 'dist/'
  }
};
