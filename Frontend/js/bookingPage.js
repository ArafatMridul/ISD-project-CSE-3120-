// Fetching from rooms.json file
fetch("../assets/data/rooms.json")
    .then((res) => res.json())
    .then((data) => {
        loadRooms(data);
        booking(data);
    });

// Function to create room cards

const loadRooms = (data) => {
    const roomContainer = document.querySelector(".roomContainer");

    for (const room of data) {
        const option = document.createElement("option");
        option.innerText = `${room.title} || ${room.price}`;
        option.value = room.id;
        roomContainer.appendChild(option);
    }
    // console.log(roomContainer);
};

// Handling valid checkin and checkout date

const cIn=document.querySelector("#checkIn");
const cOut=document.querySelector("#checkOut");

const today=new Date();
today.setDate(today.getDate()+1);

const year=today.getFullYear()
const month=(today.getMonth()+1).toString().padStart(2,"0");
const date=(today.getDate()).toString().padStart(2,"0");
const minCheckIn=`${year}-${month}-${date}`;

cIn.setAttribute("min",minCheckIn);

cIn.addEventListener("change",(e)=>{
    e.preventDefault();
    if(!cIn.value)
        return;
    const checkInDate=new Date(cIn.value);
    checkInDate.setDate(checkInDate.getDate()+1);

    const year=checkInDate.getFullYear()
    const month=(checkInDate.getMonth()+1).toString().padStart(2,"0");
    const date=(checkInDate.getDate()).toString().padStart(2,"0");
    const minCheckOut=`${year}-${month}-${date}`;

    cOut.value="";
    cOut.setAttribute("min",minCheckOut);
});

// Backend

let inputs = { name: "", checkIn: "", checkOut: "", roomType: "", price: null };

// Booking confirmation

const booking = (data) => {
    const bookBtn = document.querySelector(".bookBtn");
    const form = document.querySelector("#bookForm");
    const yesBtn = document.querySelector("#yes-btn");
    const modal = document.querySelector("#my_modal_5");

    bookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const checkIn = document.getElementById("checkIn").value;
        const checkOut = document.getElementById("checkOut").value;
        const roomSelect = document.querySelector("select[name='roomType']");
        const roomTypeFullText =
            roomSelect.options[roomSelect.selectedIndex].text;

        const [roomType, priceStr] = roomTypeFullText
            .split("||")
            .map((s) => s.trim());
        const price = parseInt(priceStr);

        inputs = { ...inputs, name, checkIn, checkOut, roomType, price };

        const alert = document.querySelector(".alert");

        if (!name || !checkIn || !checkOut || !roomType) {
            alert.classList.remove("hidden");
            setTimeout(() => {
                alert.classList.add("hidden");
            }, 5000);
            return;
        }
        modal.showModal();
    });

    yesBtn.addEventListener("click", async () => {
        await insetNewBookingIntoDB(inputs);
        window.location.href="userDashboard.html";
        modal.close();
    });
};

// Add New bookings into database
const insetNewBookingIntoDB = async (inputs) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:5120/bookings/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(inputs),
        });
        const data = await response.json();
    } catch (error) {
        console.log("error:", error);
    }
};
