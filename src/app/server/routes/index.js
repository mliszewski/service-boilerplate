import fs from 'fs';
import cwd from 'cwd';

const routes = app => {
  const prioritizedRoutes = [
    // the relative path to the middleware
    cwd(__dirname, 'heartbeat')
  ];

  // Normalize to absolute paths
  const routePaths = prioritizedRoutes.map(routePath => cwd(__dirname, routePath));

  fs
    .readdirSync(__dirname)
    .filter(file => !file.match(/(index.js|\w+.spec.js|\w+.map)/, 'ig'))
    .forEach(file => {
      const filePath = cwd(__dirname, file.split('.js').join(''));

      // If route isn't in the list already, lets add it to the list
      if (routePaths.indexOf(filePath) === -1) {
        routePaths.push(filePath);
      }
    });

  // Finally register the routes with the app
  routePaths.forEach(routePath => require(routePath).default(app)); // eslint-disable-line global-require
};

export default routes;
