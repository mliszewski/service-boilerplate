import fs from 'fs';
import cwd from 'cwd';

const tasks = (gulp, plugins, cfg) => {
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file.toLowerCase() === 'index.js') {
      return;
    }

    require(cwd(__dirname, file)).default(gulp, plugins, cfg); // eslint-disable-line global-require
  });
};

export default tasks;
