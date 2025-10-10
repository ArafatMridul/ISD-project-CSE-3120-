// make sure to pass "confirmed" or "pending" this 2 status ONLY!

const bookingId = document.querySelector("{%BOOKING_ID%}").value;
const newStatus = document.querySelector("{%CHANGED_STAUS%}").value;

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
        const data = response.json();
        if (data.success) {
            // data.success = true ---> status changed successfully
            // data.message ---> holds message saying status changes.
        } else {
            // data.success = false ---> status changed failed
            // data.message ---> error message
        }
    } catch (error) {
        console.log(error);
    }
};
