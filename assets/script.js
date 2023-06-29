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
  await loadResults(currentWeatherData, futureWeatherData);
}

async function getForecast(api) {
  return await fetch(api).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

async function loadResults(currentWeatherData, futureWeatherData) {
  const location = document.querySelector('#cityName');
  const temp = document.querySelector('#temp');
  const wind = document.querySelector('#wind');
  const humid = document.querySelector('#humid');
  const icon = document.querySelector('#conditionIcon');
  const iconSection = document.getElementById('icon');
  const disResults = document.getElementById('disResults');

  location.textContent = currentWeatherData.name + ' (' + new Date().toDateString() + ')';
  temp.textContent = `Temp: ${currentWeatherData.main.temp} °F`;
  wind.textContent = `Wind: ${currentWeatherData.wind.speed} MPH`;
  humid.textContent = `Humidity: ${currentWeatherData.main.humidity} %`;
  disResults.style.display = 'block';
  iconSection.style.display = 'block';
  icon.src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`;

  console.log('\n');

  for (let index = 5; index < 40; index += 8) {
    let forecastBoxes = document.getElementById('forecastBoxes');
    let futureResults = document.createElement('section');
    futureResults.id = 'futureResults';

    let fDate = `<p>Date: ${futureWeatherData.list[index].dt_txt}</p>`;
    let weatherImage = document.createElement('img');
    weatherImage.src = `https://openweathermap.org/img/wn/${futureWeatherData.list[index].weather[0].icon}@2x.png`;
    let fTemp = `<p>Temp: ${futureWeatherData.list[index].main.temp} °F</p>`;
    let fWind = `<p>Wind: ${futureWeatherData.list[index].wind.speed} MPH</p>`;
    let fHumidity = `<p>Humidity: ${futureWeatherData.list[index].main.humidity} %</p>`;

    futureResults.innerHTML += fDate;
    futureResults.appendChild(weatherImage);
    futureResults.innerHTML += fTemp;
    futureResults.innerHTML += fWind;
    futureResults.innerHTML += fHumidity;

    forecastBoxes.appendChild(futureResults);
  }
}
// innerHTML
// document.createElement
