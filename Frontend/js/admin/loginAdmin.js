const form = document.querySelector("#adminLoginForm");

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
            // ERROR IS SET IN data.message -> handle it in frontend
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

    const username = email.split("@")[0];

    const inputs = { username, password };
    await loginAdmin(inputs);
});
