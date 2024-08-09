const signupBtn = document.querySelector("#signup-submit");
const signupFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const zipcode = document.querySelector("#zipcode").value.trim();
    const description = document.querySelector("#description").value.trim();
    
    // radio buttons 
    const type = document.querySelector('input[name="group3"]:checked').value;

    if (username && password && type) {
        // Send a POST request to the API endpoint
        // account creation 
        if (type === "Ordinary User") {
            const response = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ username, email, password, zipcode, profile: description }),
                headers: { "Content-Type": "application/json" },
            });
             window.location.replace("/user");  
        }
        else if (type === "Provider") {
            const response = await fetch("/api/providers", {
                method: "POST",
                body: JSON.stringify({ username, email, password, zipcode, profile: description }),
                headers: { "Content-Type": "application/json" },
            });
                 window.location.replace("/provider");
            } 
        } else {
            alert("Failed to sign up");
        }
    }
    

signupBtn.addEventListener("click", signupFormHandler);