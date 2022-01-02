import { validateEmail } from '../libraries/validateEmail.js';
import { postHTTPRequest } from '../libraries/postHTTPRequest.js';
const username = document.getElementById('usernameInput');
const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const registerButton = document.getElementById('registerButton');

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validateEmail(email.value)) {
    alert('Invalid Email');
  } else {
    let response = await postHTTPRequest(
      'http://localhost:3000/user/register',
      {
        username: username.value,
        email: email.value,
        password: password.value,
      }
    );
    // LINQ - arr.first();
    let result = response.first();
    alert(result.message);
    if (result.hasOwnProperty('redirectURL'))
      window.location.href = result.redirectURL;
  }
});
