// popup.js

document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.querySelector("form");
    const DEFAULT_URL = "https://www.kiachado.com"

    chrome.storage.local.get('token', async (token) => {
        if (token?.token) {
            const response = await fetch(`${DEFAULT_URL}/api/auth/verify_token`, {
                headers: {
                    "authorization": `Bearer ${token.token}`
                }
            })
            const json = await response.json()
            if (json.ok) {
                document.querySelector(".need-login").classList.add("hidden");
                document.querySelector(".logged-in").classList.remove("hidden");

                chrome.storage.local.get('import_reviews', (data) => {
                    document.querySelector("#import-reviews").checked = data?.import_reviews
                })

                document.querySelector("#import-reviews").addEventListener("change", function () {
                    if (this.checked) {
                        chrome.storage.local.set({ import_reviews: true }, () => null);
                    } else {
                        chrome.storage.local.remove('import_reviews', () => null);
                    }
                })
            } else {
                document.querySelector(".need-login").classList.remove("hidden");
                document.querySelector(".logged-in").classList.add("hidden");
                chrome.storage.local.remove('token', () => null);
            }
        } else {
            document.querySelector(".need-login").classList.remove("hidden");
            document.querySelector(".logged-in").classList.add("hidden");
            loginForm.addEventListener("submit", async function (event) {
                event.preventDefault();

                const email = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                try {
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': 'insomnia/2023.5.8',
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    };

                    const sigin = await fetch(`https://www.kiachado.com/api/login`, options)
                    const json = await sigin.json();


                    if (json.ok) {
                        document.querySelector(".need-login").classList.add("hidden");
                        document.querySelector(".logged-in").classList.remove("hidden");
                        chrome.storage.local.set({ token: json.token }, () => null);
                        Toastify({
                            text: "Login efetuado com sucesso!",
                            duration: 2000
                        }).showToast();
                    } else {
                        Toastify({
                            text: json.message,
                            duration: 2000
                        }).showToast();
                    }

                } catch (error) {
                    console.log(error)
                }

            });
        }
    })

    document.querySelector('.logout img').addEventListener('click', () => {
        chrome.storage.local.remove('token', () => null);
        document.querySelector(".need-login").classList.remove("hidden");
        document.querySelector(".logged-in").classList.add("hidden");
    })



});
