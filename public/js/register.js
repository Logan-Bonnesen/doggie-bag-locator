document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', (event) => {
        event.preventDefault()

        const email = document.getElementById('email').value
        const username = document.getElementById('username').value
        const password = document.getElementById('passwprd').value

        fetch('/api/auth/register', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ email, username, password }),
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'User registered successfully') {
                console.log('Registration successful:', result)
                window.location.href = '/login'
            } else {
                console.error('Registration failed:', result)
                alert('Registration failed: ' + result.message)
            }
        })
        .catch(error => {
            console.error('Error during registration:', error)
            alert('An error occurred. Please try again.')
        })
    })
})