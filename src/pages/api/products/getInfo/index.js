import Auth from "../../../../utils/Auth"

export default async function addProducts(request, response) {
    const isValid = Auth(request, response)
    if(!isValid.ok)
    return response.status(400).json({ ok: false })
    
    try {
        const { link } = request.query

        if(link.includes('shopee')) {
            var shopId = link.split('i.')[1].split('.')[0]
            var itemId = link.split('i.')[1].split('.')[1].split('?')[0]
            const data = await fetch(`https://shopee.com.br/api/v4/item/get?itemid=${itemId}&shopid=${shopId}`);
            const json = await data.json()
            return response.status(200).json({ ok: true, data: json.data })
        }else{
            return response.status(400).json({ ok: false, message: 'Link do produto é inválido.'})
        }
        
    } catch (error) {
        return response.status(400).json({ ok: false, message: error.message })
    }
}