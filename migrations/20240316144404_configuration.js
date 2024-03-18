/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('configuration', table => {
        table.increments('id').primary();
        table.text('logo').nullable();
        table.text('favicon').nullable();
        table.string('site_name').nullable();
        table.text('site_description').nullable();
        table.text('site_keys').nullable();
        table.text('home_title').nullable();
        table.text('home_subtitle').nullable();
        table.json('social_networks').nullable();
        table.json('theme').nullable()
        table.boolean('show_ratings').defaultTo(true);
        table.boolean('show_reviews').defaultTo(true);
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
