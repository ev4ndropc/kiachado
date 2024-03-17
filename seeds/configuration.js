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
      logo: '/images/logo.png',
      favicon: '/images/icon.png',
      site_name: 'Ki Achado',
      site_description: 'Ki Achado - Os melhores achados da internet',
      home_title: 'Os melhores achados da internet você encontra aqui',
      home_subtitle: 'Nós encontramos e listamos os produtos mais inovadores, com o melhor preço e o melhor vendedor. Tudo para que você não tenha dor de cabeça na hora de sua compra.',
      site_keys: 'achados, achados de celulares, celulares, celulares baratos, celulares de qualidade, celulares baratos, celulares de qualidade, celulares baratos, celulares de qualidade',
      social_networks: {},
      theme: {
        primary: '#31bf6e',
        secondary: '#590ca6',
        dark: '#1a202c',
        light: '#f7fafc',
      },
      copyright: 'Copyright © 2022 - Kiachado. Todos os direitos reservados.',
      pixel: '',
      custom_javascript: '',
      custom_css: '',
    },
  ]);
};
