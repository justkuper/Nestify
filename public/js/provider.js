const logout = document.querySelector('#logout');
const profile = document.querySelector('#profile');

logout.addEventListener('click', () => {
    window.location.replace('/logout');   
});

profile.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log(event);
    const id = event.target.dataset.uid;
    if (event.target.dataset.usertype === "user") {
      window.location.replace(`/user/${id}`);
    } else {
      window.location.replace(`/provider/${id}`)
    }
});