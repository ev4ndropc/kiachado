import jimp from 'jimp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const database = require('../../../database');
const Auth = require('../../../utils/Auth');

export default async function EditConfiguration(request, response) {
    const isValid = Auth(request, response);

    if (!isValid.ok)
        return response.status(400).json({ ok: false });

    try {
        const { logo, favicon, site_name, site_description, home_title, show_ratings, show_reviews, home_subtitle, site_keys, social_networks, theme, copyright, pixel, custom_javascript, custom_css } = request.body;

        var updateIfExist = {};

        if (logo) updateIfExist.logo = logo;
        if (favicon) updateIfExist.favicon = favicon;
        if (site_name) updateIfExist.site_name = site_name;
        if (home_title) updateIfExist.home_title = home_title;
        if (home_subtitle) updateIfExist.home_subtitle = home_subtitle;
        if (site_description) updateIfExist.site_description = site_description;
        if (site_keys) updateIfExist.site_keys = site_keys;
        if (social_networks) updateIfExist.social_networks = social_networks;
        if (theme) updateIfExist.theme = theme;
        if (copyright) updateIfExist.copyright = copyright;
        if (pixel) updateIfExist.pixel = pixel;
        if (custom_javascript) updateIfExist.custom_javascript = custom_javascript;
        if (custom_css) updateIfExist.custom_css = custom_css;

        updateIfExist.show_ratings = Boolean(show_ratings);
        updateIfExist.show_reviews = Boolean(show_reviews);

        if (Object.keys(updateIfExist).length == 0) return response.status(200).json({ ok: true, message: 'Nenhum campo foi alterado!' });

        await database('configuration').update(updateIfExist).where({ id: 1 }).then(function () {
            return response.status(200).json({ ok: true, message: 'Configuração atualizada com sucesso!' });
        });

    } catch (error) {
        console.log(error);
        return response.status(400).json({ ok: false, message: error.message });
    }
}
