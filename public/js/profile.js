const updatebtn = document.querySelector("#updatebtn");

// * Function to update the profile
const updateProfileHandler = async (event) => {
  event.preventDefault();

    // * Get the values from the profile form
  const id = event.target.dataset.uid;
  const usertype = event.target.dataset.usertype;
  const profile = document.querySelector("#newprofile").value.trim();
  const zipcode = document.querySelector("#newzipcode").value.trim();
  
// * If all the values are present, make a fetch request to update the profile
// * filtering by user or provider
  if (usertype === "user") {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ profile, zipcode }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.replace(`/user`);
  } else if (usertype === "provider") {
    const response = await fetch(`/api/providers/${id}`, {
      method: "PUT",
      body: JSON.stringify({ profile, zipcode }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.replace(`/provider`);
  } else {
    alert("Failed to accept ticket");
  }
};

updatebtn.addEventListener("click", updateProfileHandler);
