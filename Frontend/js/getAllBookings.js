const getAllBookings = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:5120/bookings/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        showBookings(data);
    } catch (error) {
        console.log("error:", error);
    }
};

getAllBookings();

const showBookings = (data) => {
    const arr = data.data;
    const upcoming = document.querySelector(".upcomingBookingscontainer");
    const previous = document.querySelector(".previousBookingscontainer");
    upcoming.innerHTML = "";
    previous.innerHTML = "";
    arr.forEach((booking) => {
        // console.log(booking);
        const li = document.createElement("li");
        li.classList.add(
            "w-full",
            "max-w-[1000px]",
            "bg-[#fcf2df]",
            "h-auto",
            "text-[15px]",
            "rounded-[10px]",
            "box-border",
            "p-[13px]",
            "flex",
            "justify-between",
            "items-center"
        );

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("flex", "flex-col", "gap-[10px]");

        const bookingIdText = document.createElement("p");
        bookingIdText.classList.add("font-bold", "text-[20px]");
        bookingIdText.innerText = "Booking ID: ";
        const span1 = document.createElement("span");
        span1.classList.add("font-normal", "bookingID");
        span1.innerText = booking.id;
        bookingIdText.appendChild(span1);
        infoDiv.appendChild(bookingIdText);

        const roomTypeText = document.createElement("p");
        roomTypeText.classList.add("font-bold", "text-[20px]");
        roomTypeText.innerText = "Room Type: ";
        const span2 = document.createElement("span");
        span2.classList.add("font-normal", "roomType");
        span2.innerText = booking.roomType;
        roomTypeText.appendChild(span2);
        infoDiv.appendChild(roomTypeText);

        const checkInText = document.createElement("p");
        checkInText.classList.add("font-bold", "text-[20px]");
        checkInText.innerText = "Check-In: ";
        const span3 = document.createElement("span");
        span3.classList.add("font-normal", "roomType", "checkIn");
        span3.innerText = booking.checkIn;
        checkInText.appendChild(span3);
        infoDiv.appendChild(checkInText);

        const checkOutText = document.createElement("p");
        checkOutText.classList.add("font-bold", "text-[20px]");
        checkOutText.innerText = "Check-Out: ";
        const span4 = document.createElement("span");
        span4.classList.add("font-normal", "roomType", "checkOut");
        span4.innerText = booking.checkOut;
        checkOutText.appendChild(span4);
        infoDiv.appendChild(checkOutText);

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add(
            "cancel",
            "w-full",
            "max-w-[120px]",
            "h-[30px]",
            "bg-[#E0B973]",
            "rounded-[10px]",
            "cursor-pointer",
            "hover:bg-[#131312]",
            "duration-500",
            "ease-in",
            "text-white",
            "font-bold"
        );
        cancelBtn.innerText = "Cancel";

        const status = document.createElement("button");
        status.classList.add(
            "status",
            "w-full",
            "max-w-[120px]",
            "h-[30px]",
            "rounded-[10px]",
            "text-black",
            "font-bold",
            "text-[12px]"
        );
        status.innerText = booking.status.toUpperCase();

        const rightContainer = document.createElement("div");
        rightContainer.classList.add(
            "flex",
            "flex-col",
            "gap-[50px]",
            "w-full",
            "max-w-[50%]",
            "items-end"
        );
        rightContainer.appendChild(status);
        rightContainer.appendChild(cancelBtn);

        if (status.innerText.toUpperCase() === "CONFIRMED")
            status.classList.add("bg-[#90EE90]");
        else status.classList.add("bg-[#FF484C]");

        li.appendChild(infoDiv);
        // console.log(li);
        // console.log(today>booking.checkOut);

        const today = new Date().toLocaleDateString("en-CA");
        const checkOutDate = booking.checkOut;
        if (today < checkOutDate) {
            li.appendChild(rightContainer);
            upcoming.appendChild(li);
        } else previous.appendChild(li);

        cancelBtn.addEventListener("click", async () => {
            try {
                const response = await fetch(
                    "http://localhost:5120/bookings/cancel",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                        body: JSON.stringify({ bookingId: booking.id }),
                    }
                );

                if (!response.ok) throw new Error("Cancel failed");
                alert("Booking cancelled successfully");
                getAllBookings(); // refresh UI
            } catch (error) {
                console.error("Error cancelling booking:", error);
            }
        });
    });

    const emptyUpcoming = document.createElement("li");
    emptyUpcoming.classList.add("text-[20px]", "text-center", "text-gray-500");
    emptyUpcoming.innerText = "You have no upcoming bookings at this time";

    const emptyPrevious = document.createElement("li");
    emptyPrevious.classList.add("text-[20px]", "text-center", "text-gray-500");
    emptyPrevious.innerText = "You have no previous bookings";
    if (!upcoming.hasChildNodes()) upcoming.appendChild(emptyUpcoming);
    if (!previous.hasChildNodes()) previous.appendChild(emptyPrevious);
};
