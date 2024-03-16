// Espera até que a página termine de carregar
window.addEventListener('load', (event) => {
    // Verifica se a página é da Amazon
    if (window.location.hostname.includes("amazon.")) {
        var hasProductPage = document.querySelector('div[data-asin]');
        if (hasProductPage) {
            var image = document.createElement('img');
            image.id = 'kiachado-import';
            image.src = 'https://www.kiachado.com/images/icon.png'
            image.style = 'width: 48px; height: 48px; position: fixed; bottom: 20px; right: 20px; background:#fff;border-radius: 8px;padding:6px; cursor:pointer; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); z-index: 9999;';
            document.querySelector('body').appendChild(image);

            document.querySelector("#kiachado-import").addEventListener("click", function () {
                chrome.runtime.sendMessage({ action: "getToken" }, function (response) {
                    if (response) {
                        localStorage.setItem("kiachado-token", response);
                    } else {
                        console.log("Erro ao recuperar os dados do armazenamento local.");
                    }
                });
                const product_name = document.querySelector('#productTitle').innerText;
                const product_image = document.querySelector('#imgTagWrapperId img').src;
                const product_rating = document.querySelector('#acrPopover span.a-icon-alt').innerText
                const product_url = window.location.href;
                const reviews = Array.from(document.querySelectorAll('.a-section.review')).map(review => {
                    const review_rating = review.querySelector('.a-icon-alt').innerText
                    const review_text = review.querySelector('.review-text-content span').innerText
                    const review_profile_avatar = review.querySelector('.a-profile-avatar img').src
                    const review_profile_name = review.querySelector('.a-profile-name').innerText
                    return {
                        review_rating,
                        review_text,
                        review_profile_avatar,
                        review_profile_name
                    }
                })

                console.log({
                    product_name,
                    product_image,
                    product_rating,
                    product_url,
                    reviews
                })
            })
        }
    }
});
