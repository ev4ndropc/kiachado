// Escuta as mensagens enviadas pelo content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Verifica se a mensagem é para recuperar os dados do armazenamento local
    if (request.action === "getToken") {
        // Recupera os dados do armazenamento local
        chrome.storage.local.get('token', function (result) {
            // Envia os dados de volta para o content.js
            sendResponse(result.token);
        });
        // Retorna true para indicar que a resposta será enviada assincronamente
        return true;
    }
});