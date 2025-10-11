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
            return data.users;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

document.onload = getAllUsers();
