export const getAllUsers = async () => {
    try {
        const response = await fetch("http://localhost:5120/admin/users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (data.success) {
            console.log(data.users);
        } else {
            console.log(data.message)
        }
    } catch (error) {
        console.log(error);
    }
};

document.onload = getAllUsers();
