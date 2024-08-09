const updatebtn = document.querySelector('#updatebtn');
const updateProfileHandler = async (event) => {
    event.preventDefault();
   
    const id = event.target.dataset.uid;
    const usertype = event.target.dataset.usertype;
    const profile = document.querySelector('#newprofile').value.trim();
    const zipcode = document.querySelector('#newzipcode').value.trim();
    console.log("asdf")

    if (usertype === 'user') {
        console.log("asdf")
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ profile, zipcode}),
            headers: { 'Content-Type': 'application/json' },
        });
        window.location.replace(`/user`);
    } else if (usertype === 'provider') {
        const response = await fetch(`/api/providers/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ profile, zipcode}),
            headers: { 'Content-Type': 'application/json' },
        });
        window.location.replace(`/provider`);
    } else {
        alert('Failed to accept ticket');
    } 
}
    

    updatebtn.addEventListener('click', updateProfileHandler);
