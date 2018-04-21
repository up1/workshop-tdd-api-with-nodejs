
exports.up = function(knex, Promise) {
  return knex.schema.createTable("beer", table => {
    table.increments();
    table.string("name").notNullable().unique();
    table.text("description").notNullable();
    table.string("brand").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("beer");
};
