const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  let postRequest = await fetch('http://localhost:3000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  let response = await postRequest.json();
  localStorage.setItem('userID', response.userID);
  // TEMPORARY
  localStorage.setItem('username', response.username);
  window.location.href = response.url;
});
