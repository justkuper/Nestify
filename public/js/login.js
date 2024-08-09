const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const loginBtn = document.querySelector("#login");
    // radio buttons 
    const type = document.querySelector('input[name="group3"]:checked').value

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
loginBtn.addEventListener("click", loginFormHandler);