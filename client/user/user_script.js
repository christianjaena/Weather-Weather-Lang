import { postHTTPRequest } from '../libraries/postHTTPRequest.js';
let username = document.getElementById('username');
let email = document.getElementById('email');
let date = document.getElementById('date');
let favoritesDiv = document.getElementById('favorites');
let updateButton = document.getElementById('updateButton');
let backButton = document.getElementById('back');
let user;
let userID;
let favorites;
(async () => getUserDetails())();
async function getUserDetails() {
  userID = localStorage.getItem('userID');
  let userDetails = await fetch(`http://localhost:3000/user/${userID}`);
  let userFavorites = await fetch(`http://localhost:3000/favorite/${userID}`);
  user = await userDetails.json();
  favorites = await userFavorites.json();

  username.value = user.username;
  email.innerHTML += `
  <h3>
    ${user.email}
  </h3>
  `;
  // LINQ - arr.first()
  date.innerHTML += `
  <h3>
    ${user.createdAt.split('T').first()}
  </h3>
  `;
  favoritesDiv.innerHTML = '<h3>Naglo-load ng mga Paborito ...</h3>';
  let favoritesHTML = '';
  if (favorites.length === 0) {
    favoritesDiv.innerHTML = '<h3>Wala pang nadagdag sa mga Paborito.</h3>';
  } else {
    for (let index = 0; index < favorites.length; index++) {
      let element = favorites[index];
      let res = await postHTTPRequest(
        'http://localhost:3000/weather/info/location',
        { id: element.woeid }
      );
      let data = res.first();
      let day = data.consolidated_weather.first();
      favoritesHTML += `
      <div class="favoriteContainer">
      <h4>${data.title} ${data.location_type}</h4>
      <h5>${data.parent.title}</h5>
      <p>Timezone: ${data.timezone}</p>
      <p>Mga Coordinate: ${data.latt_long}</p>
      <p>Kondisyon ng Panahon: ${day.weather_state_name}</p>
      <img src="https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg" height="100" width="100"/>
      <div id="deleteFavorite">
        <button id=${element.woeid} class="delete btn btn-danger">Tanggalin</button>
      </div>
      </div>
      `;
    }
    favoritesDiv.innerHTML = favoritesHTML;
    setDeleteListener();
  }
}

function setDeleteListener() {
  let deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      fetch(`http://localhost:3000/favorite/delete/${button.id}`, {
        method: 'DELETE',
      })
        .then(() => window.location.reload())
        .catch((err) => console.log(err.message));
      window.location.reload();
    });
  });
}

updateButton.addEventListener('click', async () => {
  if (user.username === username.value) {
    alert('Hindi pa nababago ang username');
  } else {
    let request = await fetch(`http://localhost:3000/user/${userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value }),
    });
    let result = await request.json();
    alert('Bagong username na!');
  }
});

backButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:3000/';
});
