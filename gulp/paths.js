var bowerPaths = require('./bowerPaths.js');

module.exports = {
  root: 'dist/',
  styles: {
    watch: 'src/**/*.styl',
    src: 'src/**/*.styl',
    dest: 'dist/'
  },
  scripts: {
    watch: 'src/**/*.js',
    src: 'src/**/*.js',
    dest: 'dist/'
  },
  templates: {
    watch: 'src/**/*.jade',
    src: 'src/**/*.jade',
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
