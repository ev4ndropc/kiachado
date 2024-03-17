import sharp from 'sharp'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

const database = require('../../../database')
const Auth = require('../../../utils/Auth')


export default async function EditConfiguration(request, response) {
    const isValid = Auth(request, response)

    if (!isValid.ok)
        return response.status(400).json({ ok: false })

    try {
        const { logo, favicon, site_name, site_description, site_keys, social_networks, theme, copyright, pixel, custom_javascript, custom_css } = request.body

        const logo_name = uuidv4() + '.png'
        const favicon_name = uuidv4() + '.png'

        if (logo && logo != "") {
            const base64Image = logo.split(';base64,').pop();
            const buffer = Buffer.from(base64Image, 'base64');
            sharp(buffer)
                .toFile(`public/images/${logo_name}`, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }

        if (favicon && favicon != "") {
            const base64Image = favicon.split(';base64,').pop();
            const buffer = Buffer.from(base64Image, 'base64');
            sharp(buffer)
                .toFile(`public/images/${favicon_name}`, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }


        var updateIfExist = {}

        if (logo) updateIfExist.logo = logo_name
        if (favicon) updateIfExist.favicon = favicon_name
        if (site_name) updateIfExist.site_name = site_name
        if (site_description) updateIfExist.site_description = site_description
        if (site_keys) updateIfExist.site_keys = site_keys
        if (social_networks) updateIfExist.social_networks = social_networks
        if (theme) updateIfExist.theme = theme
        if (copyright) updateIfExist.copyright = copyright
        if (pixel) updateIfExist.pixel = pixel
        if (custom_javascript) updateIfExist.custom_javascript = custom_javascript
        if (custom_css) updateIfExist.custom_css = custom_css

        if (Object.keys(updateIfExist).length == 0) return response.status(200).json({ ok: true, message: 'Nenhum campo foi alterado!' })

        await database('configuration').update(updateIfExist).where({ id: 1 }).then(function () {
            return response.status(200).json({ ok: true, message: 'Configuração atualizada com sucesso!' })
        })

    } catch (error) {
        console.log(error)
        return response.status(400).json({ ok: false, message: error.message })
    }
}