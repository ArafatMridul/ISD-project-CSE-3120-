// Fetching from rooms.json file

fetch("../assets/data/rooms.json").then(res => res.json()).then(data => {
    loadRooms(data);
    showRoomDetails(data);
});

// Function to create room cards

const loadRooms = (data) => {
    const roomContainer = document.querySelector(".roomCardContainer");
    for (const room of data) {
        // Main Card
        const card = document.createElement("div");
        card.setAttribute("id",`${room.id}`)
        card.classList.add("roomCard","w-full", "max-w-[1200px]", "border-2", "border-slate-500", "rounded-xl", "overflow-clip");

        // Room Image
        const img = document.createElement("img");
        img.src = room.image;
        img.classList.add("w-full");

        // Room Name

        const roomName = document.createElement("div");
        roomName.classList.add("bg-[#14274A]", "text-center", "py-12");

        const roomNameText = document.createElement("p");
        roomNameText.classList.add("text-3xl", "lg:text-5xl", "text-white", "font-extrabold");
        roomNameText.innerText = room.title;
        roomName.appendChild(roomNameText);

        // Room Details and Price

        const roomDetailsContainer = document.createElement("div");

        roomDetailsContainer.classList.add("border-box", "flex", "flex-col", "lg:flex-row", "gap-10", "items-center", "justify-between", "px-30", "py-16");

        const roomDetailsButtonContainer = document.createElement("div");
        roomDetailsButtonContainer.classList.add("flex","flex-col","lg:flex-row","items-center", "gap-10")
        const plusIcon = document.createElement("div");
        plusIcon.innerText = "+";
        plusIcon.classList.add("showDetails", "size-10", "rounded-full", "bg-[#E0B973]", "text-white", "font-extralight", "text-[3.5rem]", "flex", "items-center", "justify-center", "cursor-pointer");

        const viewRoomDetails = document.createElement("p");
        viewRoomDetails.innerText = room.details_text;
        viewRoomDetails.classList.add("text-[#14274A]", "font-bold", "text-[15px]", "lg:text-[25px]","text-center");

        roomDetailsButtonContainer.appendChild(plusIcon);
        roomDetailsButtonContainer.appendChild(viewRoomDetails);

        const priceBtnContainer = document.createElement("div");
        const priceBtn = document.createElement("button");
        const span = document.createElement("span");
        span.innerText = room.price;
        priceBtn.appendChild(span);
        priceBtn.innerText = `${span.innerText}  Avg/night`;
        priceBtn.classList.add("px-8", "py-2", "lg:py-5", "bg-[#E0B973]", "text-white", "rounded-md", "font-bold", "hover:bg-[#131312]", "duration-500", "ease-in", "cursor-pointer");

        roomDetailsContainer.appendChild(roomDetailsButtonContainer);
        roomDetailsContainer.appendChild(priceBtn);
        card.appendChild(img);
        card.appendChild(roomName);
        card.appendChild(roomDetailsContainer);
        roomContainer.appendChild(card);
    }
};

// Modal functionality

const showRoomDetails = (data) => {
    const rooms = document.querySelectorAll(".roomCard");

    for (const room of rooms) {
        const check = room.querySelector(".showDetails")
        check.addEventListener("click", (e) => {
            e.preventDefault();
            const modal=document.querySelector("#my_modal_5");
            const roomData=data.find(dt=>room.id===dt.id);
            const {image:imgSrc, title:roomName,price:roomPrice,description:roomDescription}=roomData;
            modal.querySelector(".roomImg").src=imgSrc;
            modal.querySelector(".roomName").innerText=roomName;
            modal.querySelector(".roomDescription").innerText=roomDescription;
            modal.querySelector(".roomPrice").innerText=`${roomPrice} Avg/night`;
            
            modal.showModal();
        });
    }
};

// Booking Functionality

const bookNow=document.querySelector(".bookNow");

bookNow.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href="bookingPage.html";
});





