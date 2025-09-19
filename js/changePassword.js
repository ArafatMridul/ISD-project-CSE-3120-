import { supabase } from "./supabaseConfig.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("changePasswordForm");

    // Get current user from localStorage
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("You must be logged in to change password");
        window.location.href = "login.html";
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const currentPassword =
            document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match");
            return;
        }

        if (currentPassword !== currentUser.password) {
            alert("Current password is incorrect");
            return;
        }

        try {
            // Update password in Supabase
            const { data, error } = await supabase
                .from("users")
                .update({ password: newPassword })
                .eq("id", currentUser.id)
                .select(); // select returns the updated row

            console.log("Supabase response:", { data, error });

            if (error) {
                alert("Password change failed: " + error.message);
                return;
            }

            // Update localStorage
            currentUser.password = newPassword;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            alert("Password changed successfully!");
            form.reset();
        } catch (err) {
            console.error(err);
            alert("Unexpected error: " + err.message);
        }
    });
});
