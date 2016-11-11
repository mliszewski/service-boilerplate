import Connection from 'sequelize-connect';

const controller = {
  get,
  list,
  post
};

function get(resourceName, id) {
  const db = new Connection().models;

  return db[resourceName].findById(id);
}

function list(resourceName) {
  const db = new Connection().models;

  return db[resourceName].findAll();
}

function post(resourceName, body) {
  const db = new Connection().models;

  return db[resourceName].create(body);
}

export default controller;
