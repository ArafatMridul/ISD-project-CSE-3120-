const getAllBookings = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:5120/bookings/", {
            method: "GET",
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
