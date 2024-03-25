exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('name');
      table.string('email').unique();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  