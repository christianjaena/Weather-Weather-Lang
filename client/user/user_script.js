import { postHTTPRequest } from '../libraries/postHTTPRequest.js';
let username = document.getElementById('username');
let email = document.getElementById('email');
let date = document.getElementById('date');
let favoritesDiv = document.getElementById('favorites');
let updateButton = document.getElementById('updateButton');
let user;
let userID;
let favorites;
(async () => {
  userID = localStorage.getItem('userID');
  let userDetails = await fetch(`http://localhost:3000/user/${userID}`);
  let userFavorites = await fetch(`http://localhost:3000/favorite/${userID}`);
  user = await userDetails.json();
  favorites = await userFavorites.json();

  username.value = user.username;
  email.innerHTML += user.email;
  // LINQ - arr.first()
  date.innerHTML += user.createdAt.split('T').first();
  favoritesDiv.innerHTML = '<h3>Fetching Favorites ...</h3>';
  let favoritesHTML = '';
  for (let index = 0; index < favorites.length; index++) {
    let element = favorites[index];
    let res = await postHTTPRequest(
      'http://localhost:3000/weather/info/location',
      { id: element.woeid }
    );
    let data = res.first();
    let day = data.consolidated_weather.first();
    favoritesHTML += `
      <h4>${data.title} ${data.location_type}</h4>
      <h5>${data.parent.title}</h5>
      <p>Timezone: ${data.timezone}</p>
      <p>Coordinates: ${data.latt_long}</p>
      <p>Weather Condition: ${day.weather_state_name}</p>
      <img src="https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg" height="100" width="100"/>
      `;
  }
  favoritesDiv.innerHTML = favoritesHTML;
})();

updateButton.addEventListener('click', async () => {
  if (user.username === username.value) {
    alert('Username has not been changed');
  } else {
    let request = await fetch(`http://localhost:3000/user/${userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value }),
    });
    let result = await request.json();
    alert('Username updated!');
  }
});
