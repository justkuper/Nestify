
const logout = document.querySelector('#logout');
const profile = document.querySelector('#profile');
const createTicket = document.querySelector('#createTicket');

logout.addEventListener('click', () => {
    window.location.replace('/logout');   
});

profile.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log(event);
    const id = event.target.dataset.uid;
    window.location.replace(`/user/${id}`);
});

createTicket.addEventListener('click', () => {
    console.log('asdf');
    window.location.replace('/ticket');
});