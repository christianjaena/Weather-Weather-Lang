const username = document.getElementById('usernameInput');
const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();
  let postRequest = await fetch('http://localhost:3000/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  });
  let response = await postRequest.json();
  alert(response.message);
  if (response.hasOwnProperty('redirectURL')) {
    window.location.href = response.redirectURL;
  }
});
