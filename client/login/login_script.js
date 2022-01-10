import { validateEmail } from '../libraries/validateEmail.js';
import { postHTTPRequest } from '../libraries/postHTTPRequest.js';
const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validateEmail(email.value)) {
    alert('Invalid Email');
  } else {
    let response = await postHTTPRequest('http://localhost:3000/user/login', {
      email: email.value,
      password: password.value,
    });
    // LINQ - arr.first()
    let result = response.first();
    alert(result.message);
    if (result.hasOwnProperty('userID')) {
      localStorage.setItem('userID', result.userID);
      localStorage.setItem('username', result.username);
      window.location.href = result.redirectURL;
    }
  }
});
