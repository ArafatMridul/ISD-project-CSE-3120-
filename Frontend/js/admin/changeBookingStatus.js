// make sure to pass "confirmed" or "pending" this 2 status ONLY!

const bookingId = "91ee22e1-2f52-434a-a467-b4259754eedd";
const newStatus = "confirmed";

const changeBookingStatus = async () => {
    try {
        const response = await fetch(
            "http://localhost:5120/admin/booking-status",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "admin_token"
                    )}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookingId,
                    status: newStatus,
                }),
            }
        );
        const data = await response.json();
        if (data.success) {
            console.log(data.message);
        } else {
            // data.success = false ---> status changed failed
            // data.message ---> error message
        }
    } catch (error) {
        console.log(error);
    }
};

window.onload = changeBookingStatus();
