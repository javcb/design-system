#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const sbBin = path.resolve(__dirname, 'node_modules/.bin/storybook');

const sb = spawn(sbBin, ['dev', '-p', '6006'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
});

sb.on('exit', (code) => {
  process.exit(code);
});
