const signup = document.querySelector('#signup');
const login = document.querySelector('#login');

signup.addEventListener('click', () => {
    window.location.replace('/signup');
});

login.addEventListener('click', () => {
    window.location.replace('/login');
});