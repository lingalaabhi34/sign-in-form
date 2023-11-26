document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.getElementById('app');
    const isLoggedIn = localStorage.getItem('accessToken');

    if (isLoggedIn) {
        redirectToProfile();
    } else {
        renderSignupPage();
    }
});

function renderSignupPage() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = getSignupPageHTML();

    appContainer.addEventListener('click', function (event) {
        if (event.target.matches('#signupButton')) {
            handleSignup();
        }
    });
}

function getSignupPageHTML() {
    return `
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <div class="container1">
            <h2>Sign up to your account</h2>
            <div id="signupForm">
                <label for="name">Name</label><br>
                <input type="text" id="name" required><br><br>
                <label for="email">Email</label><br>
                <input type="email" id="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"><br><br>
                <label for="password">Password</label><br>
                <input type="password" id="password" required><br><br>
                <label for="confirmPassword">Confirm Password</label><br>
                <input type="password" id="confirmPassword" required><br><br>
                <button class="button1" id="signupButton">Signup</button>
            </div>
            <p id="signupMessage"></p>
        </div>
    `;
}

function handleSignup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        displayMessage('error', 'Error: All fields are mandatory!');
        return;
    }

    if (password !== confirmPassword) {
        displayMessage('error', 'Passwords do not match!');
        return;
    }

    if (!validateEmail(email)) {
        displayMessage('error', 'Invalid email format!');
        return;
    }

    // Use secure methods to store or transmit the password, e.g., hashing

    // Generate random 16-byte access token
    const accessToken = generateAccessToken();

    // Store user details in local storage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('accessToken', accessToken);

    redirectToProfile();
}



