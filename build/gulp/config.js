import cwd from 'cwd';
import config from '../../src/app/config';

const pkgJson = require(cwd('package.json'));
const buildDir = cwd('build');
const srcDir = cwd('src');

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
    formatter: 'stylish'
  },
  nodemon: {
    opts: {
      env: {
        EXPRESS_LOG_ENABLE: true,
        EXPRESS_LOG_FORMAT: 'dev'
      },
      exec: 'babel-node',
      quiet: true,
      script: cwd(pkgJson.main),
      ext: 'js',
      watch: [
        cwd('**/*.js'),
        cwd('.env*'),
        cwd('.eslint*')
      ],
      legacyWatch: true,
      ignore: [
        // Add any adhoc globs
      ].concat(pkgJson.ava.files),
      legacyWatch: true
    }
  }
};

cfg.dirs = {
  build: buildDir,
  src: srcDir
};

cfg.env = {
  isLocal: config.env.NODE_ENV === 'local',
  isVerbose: !!config.env.GULP_DEBUG
};

// Force automatically fixing lint issues
cfg.eslint.opts = {fix: cfg.env.isLocal};

export default cfg;
