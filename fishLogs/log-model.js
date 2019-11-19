const db = require('../data/dbConfig');

module.exports = {
  find,
  findById
};

function find() {
  return db('logs');
};

function findById(id) {
  return db('logs')
    .where({ id })
    .first();
};
