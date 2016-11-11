import express from 'express';

import controller from '../controllers/heartbeat';

const routes = app => {
  const router = express.Router(); // eslint-disable-line new-cap

  router
    .get('/', get);

  app.use('/heartbeat', router);
};

function get(req, res) {
  const heartbeatData = controller.get();

  return res.json(heartbeatData);
}

export default routes;
