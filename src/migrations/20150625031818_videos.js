
exports.up = function(knex, Promise) {
  var videos = knex.schema.createTable('videos', function(table) {
    table.increments().primary();
    table.string('title', 300);
    table.integer('author_id')
        .unsigned()
        .references('authors')
        .inTable('authors');
    table.string('thumbnail', 255);
    table.string('small_thumbnail', 255);
    table.string('webm', 255);
    table.string('mp3', 255);
  });

  var authors = knex.schema.createTable('authors', function(table) {
    table.increments().primary();
    table.string('username');
  });


  return Promise.all([authors, videos]);
};

exports.down = function(knex, Promise) {

    var videos = knex.schema.dropTable('videos');
    var authors = knex.schema.dropTable('authors');

    return Promise.all([authors, videos]);
};
