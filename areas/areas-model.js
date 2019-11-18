const db = require('../data/dbConfig');

module.exports = {
  find,
  findById
};

function find() {
  return db('areas').select('id', 'name');
}

function findById(id) {
  return db('areas')
    .select('id', 'area')
    .where({ id })
    .first();
}