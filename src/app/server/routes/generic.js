import express from 'express';
import Connection from 'sequelize-connect';

import controller from '../controllers/generic';

const HTTP_NOT_FOUND = 404;
const HTTP_SERVER_ERROR = 500;

const routes = app => {
  const router = express.Router(); // eslint-disable-line new-cap

  router
    .get('/', list)
    .get('/:id', get)
    .post('/', post);

  app.use('/:resource', checkResourceName, router);
};

function checkResourceName(req, res, next) {
  const db = new Connection().models;

  if (!db[req.params.resource.toLowerCase()]) {
    return res.status(HTTP_NOT_FOUND).send('Not Found');
  }

  req.resource = req.params.resource.toLowerCase();

  return next();
}

function get(req, res) {
  controller.get(req.resource, req.params.id)
    .then(result =>
      res.json(result)
    )
    .catch(error =>
      res.status(HTTP_SERVER_ERROR).send(error)
    );
};

function list(req, res) {
  controller.list(req.resource)
    .then(result =>
      res.json(result)
    )
    .catch(error =>
      res.status(HTTP_SERVER_ERROR).send(error)
    );
}

function post(req, res) {
  controller.post(req.resource, req.body)
    .then(result =>
      res.json(result)
    )
    .catch(error =>
      res.status(HTTP_SERVER_ERROR).send(error));
}

export default routes;
