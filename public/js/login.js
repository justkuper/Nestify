const loginBtn = document.querySelector("#loginBtn");

// * Function to handle the login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  // * Collect values from the login form
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  // * radio buttons
  const type = document.querySelector('input[name="group3"]:checked').value;

    // * If all the values are present, make a fetch request to log in
  if (username && password && type) {
    
    // * type is either "Ordinary User" or "Provider"
    if (type === "Ordinary User") {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      window.location.replace("/user");
    } else if (type === "Provider") {
      const response = await fetch("/api/providers/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      window.location.replace("/provider");
    }
  } else {
    alert("Failed to log in");
  }
};

loginBtn.addEventListener("click", loginFormHandler);
