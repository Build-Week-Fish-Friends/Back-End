const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db('logs');
};

function findBy(filter) {
  return db('logs').where(filter);
};

async function add(log) {
  const [id] = await db('logs').insert(log, 'id');
  return findById(id);
};

function findById(id) {
  return db('logs')
    .where({ id })
    .first();
};

async function update(id, log) {
  await db('logs')
    .where('id', Number(id))
    .update(log, 'id');
  return findById(id);
};

function remove(id) {
  return db('logs')
    .where('id', Number(id))
    .del();
};
