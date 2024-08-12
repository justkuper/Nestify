const logout = document.querySelector("#logout");
const profile = document.querySelector("#profile");

logout.addEventListener("click", () => {
  window.location.replace("/logout");
});

// * Redirect to the user or provider page based on the user type
profile.addEventListener("click", (event) => {
  event.stopPropagation();
  const id = event.target.dataset.uid;
  if (event.target.dataset.usertype === "user") {
    window.location.replace(`/user/${id}`);
  } else {
    window.location.replace(`/provider/${id}`);
  }
});
