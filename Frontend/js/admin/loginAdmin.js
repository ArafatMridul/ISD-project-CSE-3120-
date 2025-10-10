// ADMIN_USERNAME: admin
// ADMIN_PASSWORD: admin
// ---> use input field to take username and password

const adminUserName = document.querySelector("{%USERNAME%}").value;
const adminUserPassword = document.querySelector("{%PASSWORD%}").value;

const loginAdmin = async () => {
    try {
        const response = await fetch("http://localhost:5120/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: adminUserName,
                password: adminUserPassword,
            }),
        });
        const data = response.json();
        if (data.success) {
            localStorage.setItem("admin_token", data.token);
        } else {
            // ERROR IS SET IN data.message -> handle it in frontend
        }
    } catch (error) {
        console.log(error);
    }
};
