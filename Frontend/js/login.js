const form = document.querySelector("#loginForm");
const btn = document.querySelector("#submitForChangePassword");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const inputs = { email, password };

    try {
        const response = await fetch("http://localhost:5120/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });

        if (!response.ok) {
            // alert("invalid password");
            const alert = document.querySelector(".alert");
            alert.querySelector("span").innerText="Invalid password!";
            alert.classList.remove("hidden");
            setTimeout(() => {
                alert.classList.add("hidden");
            }, 5000);
            return;
        } else {
            const data = await response.json();

            if (!data) {
                const alert = document.querySelector(".alert");
                alert.querySelector("span").innerText="Something went wrong!";
                alert.classList.remove("hidden");
                setTimeout(() => {
                    alert.classList.add("hidden");
                }, 5000);
                return;
                // alert("Something went wrong");
            } else {
                localStorage.setItem("token", data.token);
                window.location.href = "./userDashboard.html";
            }
        }
    } catch (error) {
        console.log("something went wrong while logging in");
    }
});

btn.addEventListener("click", async () => {
    const email = document.querySelector("#userEmail").value;
    try {
        const response = await fetch(`http://localhost:5120/user/${email}`, {
            method: "GET",
        });
        console.log(response.ok);
        if (response.ok) {
            alert("Email found. Proceeding to password change");

            localStorage.setItem("email", email);
            setTimeout(() => {
                localStorage.removeItem("email");
            }, 2 * 60 * 1000);

            window.location.href = "./changepassword.html";
        } else {
            alert("This email does not exist");
        }
    } catch (error) { }
});
