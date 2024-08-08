const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    // radio buttons 
    const type = document.querySelector('input[name="userType"]:checked').value

    if (username && password && type) {
        // Send a POST request to the API endpoint
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            if (type === "Ordinary User") {
                document.location.replace("/users");
            } else if (type === "Provider") {
                document.location.replace("/providers");
            }
        } else {
            alert("Failed to log in");
        }
    }
}