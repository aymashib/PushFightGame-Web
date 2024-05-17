import { usersJSON } from "./db/users.js";

const users = usersJSON; // Make sure userJSON is defined or remove this line if not needed

// Get the form element
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    const usernameInput = document.getElementById('username1');
    const enteredUsername = usernameInput.value;

    const passwordInput = document.getElementById('password1');
    const enteredPassword = passwordInput.value;

    const matchingUser = users.find(user => {
        return user.name === enteredUsername && user.password === enteredPassword ;
    });

    if (matchingUser) {
// Login successful
        window.localStorage.setItem('username', enteredUsername);
        window.localStorage.setItem('password', enteredPassword);

        window.localStorage.setItem('loggedIn', 'true');
        window.location.href = '../html/home.html';
    } else {
// Login failed
        alert('Invalid username or password');

    }
});