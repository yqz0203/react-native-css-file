#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const watch = require('./src/watch');
const build = require('./src/build');
const { bin } = require('./package.json');

const packageName = Object.keys(bin)[0];

const argv = process.argv;

const dir = path.resolve(argv[2]);
const command = argv[3];

if (!fs.existsSync(dir)) {
  console.log(`
  Directory ${dir} not exists, please check.
`);
  process.exit(0);
}

if (command === '--watch') {
  watch(argv[2]);
} else if (command === undefined) {
  build(argv[2]);
} else {
  console.log(`
    Run "${packageName} ./dir --watch" for develop or "${packageName} ./dir" for production
  `);

  process.exit(0);
}