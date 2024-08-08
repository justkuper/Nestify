const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    // radio buttons 
    const type = document.querySelector('input[name="userType"]:checked').value

    if (username && password && type) {
        // Send a POST request to the API endpoint
        // account creation 
        if (type === "Ordinary User") {
            const response = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/users");
            } else {
                alert("Failed to sign up");
            }
        }
        else {
            const response = await fetch("/api/providers", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/providers");
            } else {
                alert("Failed to sign up");
            }
        }
    }
}