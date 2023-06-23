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
  const condition = document.querySelector('#condition');

  location.textContent = forecast.name;
  temp.textContent = `${forecast.main.temp}°F`;
  condition.textContent = forecast.weather[0].main;
}

const fiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=616ee85e0800531ffd57bf53410a822b';
