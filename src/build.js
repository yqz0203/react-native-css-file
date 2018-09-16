/**
 * build
 */

const fs = require('fs');
const path = require('path');
const buildCss = require('./libs/buildCss');

function traverse(dir) {
  if (!fs.existsSync(dir) || /node_modules/.test(dir)) {
    return;
  }

  var files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(dir, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      traverse(filename);
    }
    else if (path.extname(filename) === '.css') {
      buildCss(path.join(filename));
    }
  }
}

module.exports = function (dir) {
  traverse(dir);
  process.exit(0);
};
