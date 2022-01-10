import { postHTTPRequest } from '../libraries/postHTTPRequest.js';
let backButton = document.getElementById('back');
let woeid = localStorage.getItem('woeid');

backButton.addEventListener('click', () => {
  localStorage.removeItem('woeid');
  window.location.href = 'http://localhost:3000/';
});

(async () => {
  results.innerHTML = '<h1>Loading Data...</h1>'
  let res = await postHTTPRequest(
    'http://localhost:3000/weather/info/location',
    {
      id: woeid,
    }
  );
  // LINQ - arr.first()
  let data = res.first();
  results.innerHTML = `
      <h2 class="location">${data.parent.title}</h2>
      <h4>${data.title} ${data.location_type}</h4>
      <p>Timezone: ${data.timezone}</p>
      <p>Coordinates: ${data.latt_long}</p>
      `;
  // LINQ - arr.take(), arr.select(), arr.first();
  let weatherInfo = res
    .take(1)
    .select((item) => item.consolidated_weather)
    .first();
  weatherInfo.forEach((day) => {
    results.innerHTML += `
  <span>
    <p>Date: ${day.applicable_date}</p>
    <p>Weather Condition: ${day.weather_state_name}</p>
    <img src="https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg" height="100" width="100"/>
  </span>
  `;
  });
})();
