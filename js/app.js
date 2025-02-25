// DOM Elements
const content = document.getElementById('content');

// Base URL for API
const API_BASE = 'http://localhost:5000/api';

async function registerStudent(id, name) {
    const response = await fetch('/register-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}

async function login(username, password) {

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('role', data.role);
            
            // Redirect based on role
            if (data.role === 'facilitator') {
                window.location.href = '/dashboard';
            } else {
                window.location.href = '/student';
            }
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
}

// Function to handle registration
async function register(username, password, role) {
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = '/login';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
}

// Check authentication status
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        // User is authenticated
        const role = localStorage.getItem('role');
        if (role === 'facilitator') {
            window.location.href = '/dashboard';
        } else {
            window.location.href = '/student';
        }
    }
}

// Initial check for authentication
checkAuth();
