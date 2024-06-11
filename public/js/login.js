document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/api/auth/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Logged in successfully') {
                console.log('Login successful:', result)
                window.location.href = '/';
            } else {
                console.error('Login failed:', result)
                alert('Login failed: ' + result.message)
            }
        })
        .catch(error => {
            console.error('Error during login:', error)
            alert('An error occurred. Please try again.')
        })
    })
})