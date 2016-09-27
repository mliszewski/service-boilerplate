/* eslint-disable no-process-env */
import cwd from 'cwd';

const pkgJson = require(cwd('package.json'));
const buildDir = cwd('build');
const srcDir = cwd('app');

const cfg = {
  eslint: {
    src: {
      src: [
        cwd(srcDir, '**/*.js')
      ],
      build: [
        cwd(buildDir, '**/*.js')
      ]
    },
    opts: {
      formatter: 'stylish',
      fix: true
    }
  },
  nodemon: {
    opts: {
      exec: 'babel-node',
      quiet: true,
      script: cwd(pkgJson.main),
      ext: 'js',
      watch: [
        cwd('**/*.js'),
        cwd('.env*'),
        cwd('.eslint*')
      ],
      ignore: [
        // Add any adhoc globs
      ].concat(pkgJson.ava.files)
    }
  },
  ava: {
    src: pkgJson.ava.files,
    opts: {
      verbose: !!process.env.GULP_DEBUG,
      nyc: true
    }
  }
};

cfg.dirs = {
  build: buildDir,
  src: srcDir
};

cfg.env = {
  isLocal: process.env.NODE_ENV === 'local',
  isVerbose: !!process.env.GULP_DEBUG
};

export default cfg;
