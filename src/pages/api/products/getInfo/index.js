import { load } from 'cheerio'

import database from '../../../../database'
import Auth from "../../../../utils/Auth"

export default async function addProducts(request, response) {
    const isValid = Auth(request, response)
    if(!isValid.ok)
    return response.status(400).json({ ok: false })
    
    try {
        const { link, id } = request.query

        if(link) {
            if(!link)
            return response.status(400).json({ ok: false, message: 'Link do produto é inválido.'})
            
            if(link.includes('shopee')) {
                var shopId = link.split('i.')[1].split('.')[0]
                var itemId = link.split('i.')[1].split('.')[1].split('?')[0]
                const data = await fetch(`https://shopee.com.br/api/v4/item/get?itemid=${itemId}&shopid=${shopId}`);
                const json = await data.json()
    
                return response.status(200).json({ ok: true, data: json.data })
            }else if(link.includes('amazon')) {
                const data = await fetch(link);
                const html = await data.text()
                const $ = load(html)
    
                const productName = $('#productTitle').text().trim()
                const productImage = $('#imgTagWrapperId img').attr('src')
                const productRating = $('#acrPopover span.a-icon-alt').text().split(' de')[0]
    
                const dataJson = {
                    productName,
                    productImage,
                    productRating
                }
    
                return response.status(200).json({ ok: true, data: dataJson })
    
            }
            else {
                return response.status(400).json({ ok: false, message: 'Link do produto é inválido.'})
            }
        }else {
            if(!id)
            return response.status(400).json({ ok: false, message: 'Id do produto é inválido.'})

            const product = await database.select('*').from('products').where({
                id
            }).first()
            
            return response.status(200).json({ ok: true, data: product })
        }
        
    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}