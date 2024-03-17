window.addEventListener('load', (event) => {
    const DEFAULT_URL = "https://www.kiachado.com"

    chrome.storage.local.get('token', function (data) {
        if (data?.token) {
            const token = data.token
            let import_reviews = false

            chrome.storage.local.get('import_reviews', function (data) {
                import_reviews = data?.import_reviews
            });

            function scrollToSmoothly(scrollY, duration) {
                const startingY = window.pageYOffset;
                const diff = scrollY - startingY;
                let start;

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const time = timestamp - start;
                    const percent = Math.min(time / duration, 1);

                    window.scrollTo(0, startingY + diff * percent);

                    if (time < duration) {
                        window.requestAnimationFrame(step);
                    }
                }

                window.requestAnimationFrame(step);
            }


            if (window.location.hostname.includes("amazon.")) {
                var hasProductPage = document.querySelector('div[data-asin]');

                if (hasProductPage && token) {
                    var image = document.createElement('img');
                    image.id = 'kiachado-import';
                    image.src = `${DEFAULT_URL}/images/icon.png`
                    image.style = 'width: 48px; height: 48px; position: fixed; bottom: 20px; right: 20px; background:#fff;border-radius: 8px;padding:6px; cursor:pointer; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); z-index: 9999;';
                    document.querySelector('body').appendChild(image);

                    document.querySelector("#kiachado-import").addEventListener("click", function () {
                        let reviews
                        const product_name = document.querySelector('#productTitle').innerText;
                        const product_image = document.querySelector('#imgTagWrapperId img').src;
                        const product_rating = document.querySelector('#acrPopover span.a-icon-alt').innerText.split('de')[0].trim().replace(',', '.')
                        const product_url = window.location.href;
                        if (import_reviews) {
                            document.querySelector('#aplus_feature_div').remove()
                            scrollToSmoothly(document.body.scrollHeight, 5000);
                            setTimeout(async () => {
                                reviews = Array.from(document.querySelectorAll('.a-section.review')).map(review => {
                                    const review_rating = review.querySelector('.a-icon-alt').innerText.split('de')[0].trim().replace(',', '.')
                                    const review_text = review.querySelector('.review-text-content span').innerText
                                    const review_profile_avatar = review.querySelector('.a-profile-avatar img').src
                                    const review_profile_name = review.querySelector('.a-profile-name').innerText
                                    return {
                                        review_rating,
                                        review_text,
                                        review_profile_avatar: review_profile_avatar.includes('grey-pixel.gif') ? 'https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png' : review_profile_avatar,
                                        review_profile_name
                                    }
                                })

                                const data = {
                                    name: product_name,
                                    image: product_image,
                                    rating: product_rating,
                                    platform: 'amazon',
                                    link: product_url,
                                    reviews,
                                }

                                const saveProduct = await fetch(`${DEFAULT_URL}/api/products/add`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'User-Agent': 'insomnia/2023.5.8',
                                        Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify(data)
                                })

                                const saveJson = await saveProduct.json()
                                if (saveJson.ok) {
                                    window.alert('Produtos importados com sucesso!')
                                }
                            }, 5000);
                        }


                    })
                }
            }

        }
    });



});
