exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('areas').del()
    .then(function () {
      // Inserts seed entries
      return knex('areas').insert([
        {id: 1, name: 'North Muddy Boggy Creek'},
        {id: 2, name: 'South Muddy Boggy Creek'},
        {id: 3, name: 'East Lake Minnetonka'},
        {id: 4, name: 'West Lake Minnetonka'}
      ]);
    });
};