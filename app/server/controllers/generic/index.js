const controller = {
  get: get,
  list: list,
  post: post
};

function get(resourceName, id) {
  return db[resourceName].findById(id);
}

function list(resourceName) {
  return db[resourceName].findAll();
}

function post(resourceName, body) {
  return db[resourceName].create(body);
}

export default controller;
