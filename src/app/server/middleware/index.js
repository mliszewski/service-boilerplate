import fs from 'fs';
import cwd from 'cwd';

const middleware = app => {
  const prioritizedMiddleware = [
    // the relative path to the middleware, E.g. ./my-customer-mw
    cwd(__dirname, 'cors'),
    cwd(__dirname, 'bodyParser')
  ];

  // Normalize to absolute paths
  const routes = prioritizedMiddleware.map(mw => cwd(__dirname, mw));

  fs
    .readdirSync(__dirname)
    .filter(file => !file.match(/(index.js|\w+.spec.js|\w+.map)/, 'ig'))
    .forEach(file => {
      const filePath = cwd(__dirname, file.split('.js').join(''));

      // If middleware isn't in the list already, lets add it to the list
      if (routes.indexOf(filePath) === -1) {
        routes.push(filePath);
      }
    });

  // Finally register the routes with the app
  routes.forEach(mw => require(mw).default(app)); // eslint-disable-line global-require
};

export default middleware;
