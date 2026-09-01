// demo credentials: user@example.com / 123456

class AuthManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const togglePassword = document.querySelector('.toggle-password');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        if (togglePassword) {
            togglePassword.addEventListener('click', () => this.togglePasswordVisibility());
        }
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Demo validation
        if (email === 'user@example.com' && password === '123456') {
            localStorage.setItem('authToken', 'demo-token-' + Date.now());
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', 'John Doe');
            
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials. Try: user@example.com / 123456');
        }
    }

    handleSignup(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
      localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', firstName + ' ' + lastName);
        
        alert('Account created successfully!');
        window.location.href = 'dashboard.html';
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password') || document.getElementById('signupPassword');
        const toggleBtn = document.querySelector('.toggle-password');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.classList.add('active');
        } else {
            passwordInput.type = 'password';
            toggleBtn.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
