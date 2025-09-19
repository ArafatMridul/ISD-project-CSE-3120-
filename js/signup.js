import { supabase } from "./supabaseConfig.js";
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password-2").value;

    // Basic validation
    if (!name || !email || !password || !password2) {
        alert("Please fill all fields");
        return;
    }

    if (password !== password2) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Insert user into Supabase
        const { data, error } = await supabase
            .from("users")
            .insert([{ fullname: name, email, password }])
            .select();

        console.log(data);

        if (error) {
            alert("Error: " + error.message);
            return;
        }

        // Save user session
        SessionManager.setUser(data[0]);

        alert("Signup successful!");
        window.location.href = "index.html"; // redirect after signup
    } catch (err) {
        console.error(err);
        alert("An unexpected error occurred");
    }
});
