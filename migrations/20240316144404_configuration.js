/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('configuration', table => {
        table.increments('id').primary();
        table.string('logo').nullable();
        table.string('favicon').nullable();
        table.string('site_name').nullable();
        table.text('site_description').nullable();
        table.text('site_keys').nullable();
        table.json('social_networks').nullable();
        table.json('theme').nullable();
        table.text('copyright').nullable();
        table.text('pixel').nullable();
        table.text('custom_javascript').nullable();
        table.text('custom_css').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('configuration');
};