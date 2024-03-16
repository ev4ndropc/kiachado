const bcrypt = require('bcrypt')
const config = require('../src/config')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      email: config.ADMIN_EMAIL,
      password: bcrypt.hashSync(config.ADMIN_EMAIL, 10),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    },
  ]);
};
