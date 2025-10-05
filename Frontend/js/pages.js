// Switching between (Login and Signup) and Dashboard

const cred = localStorage.getItem("token");
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const dashboard = document.querySelector(".dashboard");


if (cred) {
    window.onload = async () => {
    try {
        const response = await fetch("http://localhost:5120/user/", {
            method: "GET",
            headers: {
                authorization: cred,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dashboard.querySelector("a").innerText = `${data.firstName} ${data.lastName}`;
    } catch (error) {
        console.error("Error in fetching user details:", error);
    }
};
    login.classList.add("hidden");
    signup.classList.add("hidden");
    dashboard.classList.remove("hidden");
}
else {
    login.classList.remove("hidden");
    signup.classList.remove("hidden");
    dashboard.classList.add("hidden");
}

// Booking Functionality

const bookBtn = document.querySelector(".bookNow");

if(bookBtn){
    bookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "bookingPage.html";
    });
}