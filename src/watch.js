const chokidar = require('chokidar');
const buildCss = require('./libs/buildCss');
const path = require('path');


module.exports = (dir) => {
  // tips: 这里必须使用绝对路径
  const watcher = chokidar.watch(`${path.resolve(dir)}/**/*.css`, {
    ignored: /node_modules/,
  });

  watcher
    .on('add', filePath => {
      const relative = path.relative(path.resolve('.'), filePath);
      buildCss(relative);
    })
    .on('change', filePath => {
      const relative = path.relative(path.resolve('.'), filePath);
      buildCss(relative);
    });
};
