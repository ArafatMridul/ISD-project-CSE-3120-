// create a button and make it to run the following function onclick

export const getAllUsers = async () => {
    try {
        const response = await fetch("http://localhost:5120/admin/users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                "Content-Type": "application/json",
            },
        });
        const data = response.json();
        if (data.success) {
            // data.users ---> all user details
        } else {
            // data.message ---> error message
        }
    } catch (error) {
        console.log(error);
    }
};
