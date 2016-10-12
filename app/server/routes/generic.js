import express from 'express';

import controller from '../controllers/generic';

const routes = app => {
  const router = express.Router(); // eslint-disable-line new-cap

  router
    .get('/', list)
    .get('/:id', get)
    .post('/', post);

  app.use('/:resource', checkResourceName, router);
};

function checkResourceName(req, res, next) {
  if (!db[req.params.resource.toLowerCase()]) {
    return res.status(404).send('Not Found');
  }

  req.resource = req.params.resource.toLowerCase();
  return next();
}

function get(req, res) {
  controller.get(req.resource, req.params.id).then(data => {
    return res.json(data);
  }).catch(err => {
    return res.status(500).send(err);
  });
}

function list(req, res) {
  controller.list(req.resource).then(data => {
    return res.json(data);
  }).catch(err => {
    return res.status(500).send(err);
  });
}

function post(req, res) {
  controller.post(req.resource, req.body).then(data => {
    return res.json(data);
  }).catch(err => {
    return res.status(500).send(err);
  });
}

export default routes;
