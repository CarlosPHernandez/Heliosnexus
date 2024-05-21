document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://q7lq0reofa.execute-api.us-east-1.amazonaws.com/prod', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert('User registered successfully');
    } else {
        alert(`Error: ${data.error}`);
    }
});
