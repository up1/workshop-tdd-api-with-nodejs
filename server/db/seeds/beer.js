'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('beer').insert([
        {id: 1, name: 'Another One', description: 'IPA', brand: 'IPA'},
        {id: 2, name: 'Midway IPA', description: 'IPA', brand: 'IPA'},
        {id: 3, name: 'All Day IPA', description: 'IPA', brand: 'IPA'},
      ]);
    });
};
