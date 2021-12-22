const username = document.getElementById('usernameInput');
const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const registerButton = document.getElementById('registerButton');

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validateEmail(email.value)) {
    alert('Invalid Email');
  } else {
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
  }
});
