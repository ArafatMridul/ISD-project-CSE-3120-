const form = document.querySelector("#signupForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password-2");

    if (password !== password2) {
        alert("Passwords do not match!");
        return;
    }

    const inputs = { firstName, lastName, email, password };

    try {
        const response = await fetch("http://localhost:5120/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });

        const data = await response.json();
        console.log("Server response:", data);

        if (response.ok) {
            alert("Signup successful!");
            window.location.href = "./login.html";
        } else {
            alert(data.message || "Signup failed");
        }
    } catch (err) {
        console.error("Signup error:", err);
        alert("Something went wrong. Try again.");
    }
});
