// Fetching from rooms.json file

fetch("../assets/data/rooms.json").then(res => res.json()).then(data => {
    loadRooms(data);
    booking(data);
});

// Function to create room cards

const loadRooms = (data) => {
    const roomContainer = document.querySelector(".roomContainer");

    for (const room of data) {
        const option = document.createElement("option");
        option.innerText = room.title;
        option.value = room.id;
        roomContainer.appendChild(option);
    }
    // console.log(roomContainer);
};


// Booking confirmation

const booking = (data) => {
    const bookBtn = document.querySelector(".bookBtn");
    const form = document.querySelector(".bookForm");

    bookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const checkIn = document.getElementById("checkIn").value;
        const checkOut = document.getElementById("checkOut").value;
        const roomType = document.querySelector("select[name='roomType']").value;
        const alert=document.querySelector(".alert");

        if (!name || !checkIn || !checkOut || !roomType) {
            alert.classList.remove("hidden");
            setTimeout(()=>{
                alert.classList.add("hidden");
            },5000);
            return;
        }
        const modal = document.querySelector("#my_modal_5");
        modal.showModal();
    });
}
