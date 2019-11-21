const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db('areas').select('id', 'name');
}

function findById(id) {
  return db('areas')
    .select('id', 'name')
    .where({ id })
    .first();
}

async function add(area) {
  const [id] = await db('areas').insert(area);
  return findById(id);
}