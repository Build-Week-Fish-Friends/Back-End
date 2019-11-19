exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('logs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([
        {id: 1, name: 'logName1', description: "This place was buggy", duration: "2h", bait: "Wet Bait", num_catch: 0, species: "Striper", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 1, area_id: 1},
        {id: 2, name: 'logName2', description: "Nice shade spot", duration: "3h 35m", bait: "Dry Bait", num_catch: 0, species: "Croppie", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 1, area_id: 2},
        {id: 3, name: 'logName3', description: "Too much traffic in this area", duration: "1h 17m", bait: "Lure", num_catch: 0, species: "Catfish", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 1, area_id: 3},
        {id: 4, name: 'logName4', description: "Clear waters", duration: "2h 48m", bait: "streamer", num_catch: 0, species: "Sunfish", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 2, area_id: 4}
      ]);
    });
};
