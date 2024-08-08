const signup = document.querySelector('#signup');
const login = document.querySelector('#login');

signup.addEventListener('click', () => {
    document.location.replace('/signup');
});

login.addEventListener('click', () => {
    document.location.replace('/login');
});