// popup.js

document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.querySelector("form");
    const token = localStorage.getItem("token");

    if (token) {
        const response = await fetch(`https://www.kiachado.com/api/users`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        const json = await response.json()
        console.log(json)
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

                const sigin = await fetch('https://www.kiachado.com/api/login', options)
                const json = await sigin.json();

                if (json.ok) {
                    localStorage.setItem('token', json.token)
                }

            } catch (error) {
                console.log(error)
            }

        });
    }

});
