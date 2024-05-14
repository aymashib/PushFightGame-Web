// Function to check if user is logged in and change login button to logout
function updateLoginButton() {
    const loginButton = document.getElementById('loginButton');
    const welcomeMessage = document.getElementById('welcomeMessage'); // Add this line to get the welcome message element

    if (window.localStorage.getItem('loggedIn')) {
        const username = window.localStorage.getItem('username'); // Get the username from local storage
        welcomeMessage.textContent = 'Welcome ' + username; // Set the welcome message
        loginButton.textContent = 'Logout';
        loginButton.href = '#'; // You can set href to any value, it will be replaced by JS when clicked
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.localStorage.removeItem('loggedIn');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('password');
            window.location.href = '../html/login.html'; // Redirect to the login page
            welcomeMessage.textContent = ''; // Clear the welcome message when logged out
        });
    } else {
        welcomeMessage.textContent = ''; // Clear the welcome message if not logged in
        loginButton.textContent = 'Login';
        loginButton.href = '../html/login.html';
    }
}

updateLoginButton(); // Call the function when the page loads

function updateLeaderBoardBtn(){
    const LBbutton = document.getElementById("LBbtn");

    if (window.localStorage.getItem('loggedIn')){
        LBbutton.style.display = 'block';
    } else LBbutton.style.display = 'none';

}
updateLeaderBoardBtn();

function updateFormBtn(){
    const formButton = document.getElementById("Formbtn");

    if (window.localStorage.getItem('loggedIn')){
        formButton.style.display = 'block';
    } else formButton.style.display = 'none';

}
updateFormBtn();
