// popup.js

document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.querySelector("form");
    const DEFAULT_URL = "https://www.kiachado.com"

    chrome.storage.local.get('token', async (token) => {
        if (token?.token) {
            const response = await fetch(`${DEFAULT_URL}/api/users`, {
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
                            sign: '34f59dcc-b729-4637-bc80-c18a194755d4',
                            merchant: 'L2Elyx'
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    };

                    const sigin = await fetch(`https://www.kiachado.com/api/login`, options)
                    const json = await sigin.json();

                    if (json.ok) {
                        chrome.storage.local.set({ token: json.token }, () => null);
                    }

                } catch (error) {
                    console.log(error)
                }

            });
        }
    })




});
