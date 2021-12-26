const logoutButton = document.getElementById('logoutButton');
const username = document.getElementById('username');
const location = document.getElementById('location');
username.innerHTML += `<a href="http://localhost:3000/user">${localStorage.getItem(
  'username'
)}</a>`;

logoutButton.addEventListener('click', async () => {
  let postRequest = await fetch('http://localhost:3000/session/logout', {
    method: 'POST',
  });
  let response = await postRequest;
  localStorage.removeItem('userID');
  localStorage.removeItem('username');
  if (response.redirected) {
    window.location.href = response.url;
  }
});

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    location.innerHTML = 'Geolocation is not supported by this browser.';
  }
})();

function showPosition(position) {
  location.innerHTML =
    'Latitude: ' +
    position.coords.latitude +
    '<br>Longitude: ' +
    position.coords.longitude;
}
