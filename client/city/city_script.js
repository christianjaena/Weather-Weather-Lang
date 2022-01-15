import { postHTTPRequest } from '../libraries/postHTTPRequest.js';
let backButton = document.getElementById('back');
let favoritesButton = document.getElementById('favorite');
let weatherOverview = document.getElementById('weatherOverview');
let userID = localStorage.getItem('userID');
let woeid = localStorage.getItem('woeid');
let location = '';

favoritesButton.addEventListener('click', async () => {
  if (location === '') {
    alert('Kinukuha pa rin ang data ...');
  } else {
    let body = {
      woeid,
      userID,
      location,
    };
    let res = await postHTTPRequest('http://localhost:3000/favorite/add', body);
    let result = res.first();
    alert(result.message);
  }
});

backButton.addEventListener('click', () => {
  localStorage.removeItem('woeid');
  window.location.href = 'http://localhost:3000/';
});

(async () => {
  weatherOverview.innerHTML = '<h1>Naglo-load ng Data...</h1>';
  let res = await postHTTPRequest(
    'http://localhost:3000/weather/info/location',
    {
      id: woeid,
    }
  );
  // LINQ - arr.first()
  let data = res.first();
  location = `${data.title} ${data.location_type}`;
  weatherOverview.innerHTML = `
    <div class="weatherInfoContainer">
      <h2 class="location">${data.parent.title}</h2>
      <h4>${location}</h4>
      <p>Timezone: ${data.timezone}</p>
      <p>Mga Coordinate: ${data.latt_long}</p>
    </div>
      `;
  // LINQ - arr.take(), arr.select(), arr.first();
  let weatherInfo = res
    .take(1)
    .select((item) => item.consolidated_weather)
    .first();
  weatherInfo.forEach((day) => {
    results.innerHTML += `
      <div class="dayWeather">
          <h1> ${day.applicable_date}</h1>
          <p>Kondisyon ng Panahon: ${day.weather_state_name}</p>
          <img src="https://www.metaweather.com/static/img/weather/${
            day.weather_state_abbr
          }.svg" height="100" width="100"/>
          <p>Chansa:${day.predictability}%</p>
          <p>Halumigmig:${day.humidity}%</p>
          <p>Karaniwang Temperatura: ${day.the_temp.toFixed(2)} celsius</p>
          <p>Pinakamataas na Temperatura: ${day.max_temp.toFixed(2)} celsius</p>
          <p>Pinakamababang Temperatura: ${day.min_temp.toFixed(2)} celsius</p>
          <p>Bilis ng Hangin:  ${day.wind_speed.toFixed(2)} mph</p>
          <p>Direksyon ng Hangin: ${day.wind_direction.toFixed(2)} ${
      day.wind_direction_compass
    }</p>
          <p>Presyon ng Hangin:${day.air_pressure} millibar</p>
          <p>Bisibiliti: ${day.visibility.toFixed(2)} milya</p>
      </div>
    `;
  });
})();
