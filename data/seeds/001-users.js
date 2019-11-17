
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'fishFriend', password: '1234'},
        {id: 2, username: 'Ben', password: 'password'}
      ]);
    });
};
