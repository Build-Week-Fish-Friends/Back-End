exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('logs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([
        {name: 'Secret Spot', description: "This place was buggy", duration: "2h", bait: "Wet Bait", num_catch: 3, species: "Striper", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 1, area_id: 1},
        {name: 'Nap Spot', description: "Nice shade spot", duration: "3h 35m", bait: "Dry Bait", num_catch: 0, species: "", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 1, area_id: 2},
        {name: 'Busy Lake', description: "Too much traffic in this area", duration: "1h 17m", bait: "Lure", num_catch: 1, species: "Catfish", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 2, area_id: 3},
        {name: 'Quieter Lake', description: "Clear waters", duration: "2h 48m", bait: "streamer", num_catch: 7, species: "Sunfish", photo_url: "https://media.istockphoto.com/photos/fishing-concepts-picture-id664304800?k=6&m=664304800&s=612x612&w=0&h=ROFo47Oot_zqg8SOLgj_3hZ0a8RpsfGfQhdC3zYqUeA=", user_id: 2, area_id: 4}
      ]);
    });
};
