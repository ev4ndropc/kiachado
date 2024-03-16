/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('configuration').del()
  await knex('configuration').insert([
    {
      id: 1,
      logo: 'logo.png',
      favicon: 'icon.png',
      site_name: 'Ki Achado',
      site_description: 'Ki Achado - Os melhores achados da internet',
      site_keys: 'achados, achados de celulares, celulares, celulares baratos, celulares de qualidade, celulares baratos, celulares de qualidade, celulares baratos, celulares de qualidade',
      social_networks: [],
      theme: [],
      copyright: 'Copyright © 2022 - Kiachado. Todos os direitos reservados.',
      pixel: '',
      custom_javascript: '',
      custom_css: '',
    },
  ]);
};
