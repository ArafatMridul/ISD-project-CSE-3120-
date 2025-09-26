
// Section Selection

const sections = document.querySelectorAll("main section");

const myProfile = () => {
    sections[0].classList.add("flex");
    sections[0].classList.remove("hidden");
    sections[1].classList.remove("flex");
    sections[1].classList.add("hidden");
}

const myBookings = () => {
    sections[1].classList.add("flex");
    sections[1].classList.remove("hidden");
    sections[0].classList.remove("flex");
    sections[0].classList.add("hidden");
}


const sidebarSelection = () => {
    const menu = document.querySelectorAll(".menu li");
    const logoutModal = document.querySelector("#my_modal_5");
    const btns = logoutModal.querySelectorAll("button");
    let lastActive = "My Profile";

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.innerText === "No") {
                if (lastActive == "My Profile") {
                    myProfile();
                    const it = document.querySelector(".myProfile");
                    it.classList.add("text-[#e0b973]", "bg-[#131312]");
                    it.classList.remove("text-white");
                }
                else {
                    myBookings();
                    const it = document.querySelector(".myBookings");
                    it.classList.add("text-[#e0b973]", "bg-[#131312]");
                    it.classList.remove("text-white");
                }
                const logout = document.querySelector(".logout");
                logout.classList.remove("text-[#e0b973]", "bg-[#131312]");
                logout.classList.add("text-white");
            }
            else if (btn.innerText === "Yes") {
                // logout functionality
                window.location.href = "index.html";
            }

        });
    });

    menu.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.add("text-[#e0b973]", "bg-[#131312]");
            item.classList.remove("text-white");
            for (li of menu) {
                if (li !== item) {
                    li.classList.remove("text-[#e0b973]", "bg-[#131312]");
                    li.classList.add("text-white");
                }
            }
            const span = item.querySelector("span");
            if (span.innerText === "My Profile") {
                myProfile();
                lastActive = "My Profile";
            }
            else if (span.innerText === "My Bookings") {
                myBookings();
                lastActive = "My Bookings";
            }
            else
                logoutModal.showModal();
        });
    });
}

sidebarSelection();

// Sidebar Close

document.querySelector(".sidebarClose").addEventListener("click", () => {
    document.querySelector("#my-drawer-2").checked = false;
});