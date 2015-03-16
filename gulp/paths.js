var bowerPaths = require('./bowerPaths.js');

module.exports = {
  root: 'dist/',
  styles: {
    watch: 'lib/**/*.styl',
    src: 'lib/_scaffolding.styl',
    dest: 'dist/css'
  },
  scripts: {
    watch: 'lib/**/*.js',
    src: 'lib/**/*.js',
    dest: 'dist/js'
  },
  templates: {
    watch: 'lib/**/*.jade',
    src: 'lib/**/*.jade',
    dest: 'dist/'
  },
  vendor: {
    styles: {
      watch: 'bower_components/**/*.css',
      src: bowerPaths.styles,
      dest: 'dist/css'
    },
    scripts: {
      watch: 'bower_components/**/*.js',
      src: bowerPaths.scripts,
      dest: 'dist/js'
    }
  }
};
