// create a button and make it to run the following function onclick

export const getAllBookings = async () => {
    try {
        const response = await fetch("http://localhost:5120/admin/bookings", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (data.success) {
            console.log(data.bookings);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

window.onload = getAllBookings();
