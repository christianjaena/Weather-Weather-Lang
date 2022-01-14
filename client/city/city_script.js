import { postHTTPRequest } from '../libraries/postHTTPRequest.js';
let backButton = document.getElementById('back');
let favoritesButton = document.getElementById('favorite');
let userID = localStorage.getItem('userID');
let woeid = localStorage.getItem('woeid');
let location = '';

favoritesButton.addEventListener('click', async () => {
  if (location === '') {
    alert('Still Fetching Data ...');
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
  results.innerHTML = '<h1>Loading Data...</h1>';
  let res = await postHTTPRequest(
    'http://localhost:3000/weather/info/location',
    {
      id: woeid,
    }
  );
  // LINQ - arr.first()
  let data = res.first();
  location = `${data.title} ${data.location_type}`;
  results.innerHTML = `
      <h2 class="location">${data.parent.title}</h2>
      <h4>${location}</h4>
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
 
    <div class="main">
      <div class="container3"> 
          <h1 > ${day.applicable_date}</h1><br />
          
          Weather Condition: ${day.weather_state_name}

          <img src="https://www.metaweather.com/static/img/weather/${
              day.weather_state_abbr
            }.svg" height="100" width="100"/> <br /> <br />
            
            Predictability:${day.predictability}<br />
            Humidity:${day.humidity}<br />
            Avg Temperature: ${day.the_temp.toFixed(2)}<br />
            Max Temperature: ${day.max_temp.toFixed(2)}<br />
            MinTemperature: ${day.min_temp.toFixed(2)}<br />
            Wind Speed:  ${day.wind_speed.toFixed(2)}<br />

            Wind Direction: ${day.wind_direction.toFixed(2)} ${
              day.wind_direction_compass
            }<br />
            
            Air Pressure:${day.air_pressure} <br />
            Visibility: ${day.visibility.toFixed(2)}
            </div>
        </div>  
 
    `;
  });
})();
