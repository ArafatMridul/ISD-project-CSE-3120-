document.addEventListener("DOMContentLoaded", () => {
    const logoutButtons = document.querySelectorAll(".logout-btn");

    logoutButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Clear user session
            localStorage.removeItem("currentUser");

            // show message
            alert("You have been logged out");

            // Redirect to login page
            window.location.href = "login.html";
        });
    });
});
