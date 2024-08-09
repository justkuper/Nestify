
const logout = document.querySelector('#logout');
const profile = document.querySelector('#profile');
const createTicket = document.querySelector('#createTicket');

logout.addEventListener('click', () => {
    window.location.replace('/logout');   
});

profile.addEventListener('click', (event) => {
    console.log(event.target);
    const id = event.target.dataset.uid;
    // window.location.replace(`/users/${id}`);
});

createTicket.addEventListener('click', () => {
    console.log('asdf');
    window.location.replace('/ticket');
});