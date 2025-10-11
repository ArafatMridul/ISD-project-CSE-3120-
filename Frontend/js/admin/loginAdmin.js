const form = document.querySelector("#adminLoginForm");
console.log(form);
const loginAdmin = async (inputs) => {
    try {
        const response = await fetch("http://localhost:5120/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
            localStorage.setItem("admin_token", data.token);
            window.location.href = "./adminDashboard.html";
        } else {
            const alert = document.querySelector(".alert");
            alert.querySelector("span").innerText=data.message;
            alert.classList.remove("hidden");
            setTimeout(() => {
                alert.classList.add("hidden");
            }, 5000);
            return;
        }
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const username = email.split("@")[0].trim();

    const inputs = { username, password };
    await loginAdmin(inputs);
});
