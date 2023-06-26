const weatherPic = `https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2{}`;
var searchBtn = document.getElementById('searchBtn');

async function getWeather() {
  var input = document.getElementById('searchText').value;
  var weatherData = await forecast(input);
  console.log('weatherData', weatherData);
  await loadResults(weatherData);
}

searchBtn.addEventListener('click', getWeather);

async function forecast(cityName) {
  const geoApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=616ee85e0800531ffd57bf53410a822b&units=imperial`;
  return await fetch(geoApi)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function loadResults(forecast) {
  const location = document.querySelector('#cityName');

  const temp = document.querySelector('#temp');
  const wind = document.querySelector('#wind');
  const humid = document.querySelector('#humid');
  const icon = document.querySelector('#conditionIcon');
  const iconSection = document.getElementById('icon');
  const disResults = document.getElementById('disResults');

  location.textContent = forecast.name + ' (' + Date() + ')';

  temp.textContent = `Temp: ${forecast.main.temp} °F`;
  wind.textContent = `Wind: ${forecast.wind.speed} MPH`;
  humid.textContent = `Humidity: ${forecast.main.humidity} %`;
  disResults.style.display = 'block';
  iconSection.style.display = 'block';
  icon.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
}

// export function locationFiveDay(lat, lon) {
//   const coord = document.querySelector('#coord');
//   const fiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=616ee85e0800531ffd57bf53410a822b';
// }
