
exports.up = function(knex) {
  return knex.schema.createTable('logs', log => {
    
    log.increments();

    log
      .string('name', 255)
      .notNullable();

    log
      .string('description', 2559);

    log
      .float('latitude', 9, 6);

    log
      .float('longitude', 9, 6);

    log
      .string('duration', 128);

    log 
      .timestamp('created_at')
      .defaultTo(knex.fn.now());

    log
      .string('bait', 128);

    log
      .integer('num_catch');

    log
      .string('species', 128);

    log
      .string('photo_url', 2559);

    log
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    log
      .integer('area_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('areas');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('logs');
};
