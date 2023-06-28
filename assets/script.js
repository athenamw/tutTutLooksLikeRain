const weatherPic = `https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2{}`;
var searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', getWeather);

async function getWeather() {
  let cityName = document.getElementById('searchText').value;
  const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=616ee85e0800531ffd57bf53410a822b&units=imperial`;
  let currentWeatherData = await getForecast(currentWeatherApi);
  const futureForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=616ee85e0800531ffd57bf53410a822b&units=imperial`;
  var futureWeatherData = await getForecast(futureForecast);
  console.log('weatherData', currentWeatherData);
  console.log('Future Weather Data', futureWeatherData);
  await loadResults(currentWeatherData);
}

async function getForecast(api) {
  return await fetch(api).then((response) => {
    if (response.ok) {
      return response.json();
    }
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
