const logoutButton = document.getElementById('logoutButton');
const username = document.getElementById('username');
username.innerHTML += localStorage.getItem('username');

logoutButton.addEventListener('click', async () => {
  let postRequest = await fetch('http://localhost:3000/logout', {
    method: 'POST',
  });
  let response = await postRequest;
  localStorage.removeItem('userID');
  localStorage.removeItem('username');
  if (response.redirected) {
    window.location.href = response.url;
  }
});
