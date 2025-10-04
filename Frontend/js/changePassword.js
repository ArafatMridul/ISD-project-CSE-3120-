const newPassword = document.querySelector("#newPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const form = document.querySelector("#changePasswordForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const newPasswordValue = newPassword.value;
    const confirmPasswordValue = confirmPassword.value;

    if (newPasswordValue !== confirmPasswordValue) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5120/user/${token}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: newPasswordValue }),
        });

        if (response.ok) {
            alert("Password changed successfully");
            window.location.href = "./login.html";
        } else {
            const data = await response.json();
            alert(data.message || "Something went wrong");
        }
    } catch (error) {
        console.log(error);
        alert("Network error");
    }
});
