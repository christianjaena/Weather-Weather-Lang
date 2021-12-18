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
    body: JSON.stringify({ email: email.value, password: password.value }),
  });
  let result = await postRequest.json();
  console.log(result);
});
