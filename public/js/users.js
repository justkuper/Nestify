const { log } = require("handlebars");

const logout = document.querySelector('#logout');
const profile = document.querySelector('#profile');
const openRequests = document.querySelector('#open');

logout.addEventListener('click', () => {
    window.location.replace('/logout');   
});

profile.addEventListener('click', () => {
    window.location.replace('/users/');
});

openRequests.addEventListener('click', () => {
    window.location.replace('/ticket');
});