const chokidar = require('chokidar');
const buildCss = require('./libs/buildCss');
const path = require('path');


module.exports = (dir) => {
  const watcher = chokidar.watch(`${path.resolve(dir)}/**/*.css`, {
    ignored: /node_modules/,
  });

  watcher
    .on('add', path => {
      buildCss(path);
    })
    .on('change', path => {
      buildCss(path);
    });
};
