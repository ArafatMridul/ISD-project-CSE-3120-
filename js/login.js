import { supabase } from "./supabaseConfig.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", email)
                .eq("password", password)
                .single();

            if (error || !data) {
                alert("Invalid email or password");
                return;
            }

            // Save session
            window.localStorage.setItem("currentUser", JSON.stringify(data));

            alert("Login successful!");
            window.location.href = "index.html";
        } catch (err) {
            console.error(err);
            alert("An error occurred: " + err.message);
        }
    });
});


// Forgot Password Functionality

document.addEventListener("DOMContentLoaded", () => {
    const forgotBtn = document.querySelector(".forgotBtn");
    forgotBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Password reset link has been sent to your email!");
        document.getElementById("my_modal_3").close();
    });
});
