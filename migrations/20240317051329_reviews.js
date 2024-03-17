/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema.createTable('reviews', table => {
        table.increments('id').primary();
        table.integer('product_id').notNullable()
        table.text('review_rating').nullable()
        table.text('review_text').nullable()
        table.text('review_profile_avatar').nullable()
        table.text('review_profile_name').nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('reviews');
};
