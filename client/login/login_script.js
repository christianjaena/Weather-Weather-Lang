const email = document.getElementById('emailInput');
const password = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validateEmail(email.value)) {
    alert('Invalid Email');
  } else {
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
    alert(response.message);
    if (response.hasOwnProperty('userID')) {
      localStorage.setItem('userID', response?.userID);
      // TEMPORARY
      localStorage.setItem('username', response.username);
      window.location.href = response.redirectURL;
    }
  }
});
