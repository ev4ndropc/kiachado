/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.text('image').notNullable();
        table.decimal('rating').defaultTo('0');
        table.string('platform').notNullable();
        table.text('link').notNullable();
        table.integer('clicks').nullable().defaultTo('0');
        table.text('affiliateLink').defaultTo('');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
