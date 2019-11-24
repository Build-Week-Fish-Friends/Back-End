exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('areas').del()
    .then(function () {
      // Inserts seed entries
      return knex('areas').insert([
        {name: 'North Muddy Boggy Creek'},
        {name: 'South Muddy Boggy Creek'},
        {name: 'East Lake Minnetonka'},
        {name: 'West Lake Minnetonka'}
      ]);
    });
};