const weatherPic = `https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2{}`;
var searchBtn = document.getElementById('searchBtn');
var searchText = document.getElementById('searchText');
// loads saved cities
window.addEventListener('load', cityLoop);
// search box/button
searchBtn.addEventListener('click', searchEventListener);
searchText.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchEventListener();
  }
});
// clears text content from input
async function searchEventListener() {
  let cityName = searchText.value;
  searchText.value = '';
  await getWeather(cityName);
  await save(cityName);
}
// apis to get weather
async function getWeather(cityName) {
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
// displays forecast
async function loadResults(currentWeatherData, futureWeatherData) {
  const location = document.querySelector('#cityName');
  const temp = document.querySelector('#temp');
  const wind = document.querySelector('#wind');
  const humid = document.querySelector('#humid');
  const icon = document.querySelector('#conditionIcon');
  const iconSection = document.getElementById('icon');
  const disResults = document.getElementById('disResults');
  const fiveDayHeader = document.getElementById('fiveDayHeader');

  location.textContent = currentWeatherData.name + ' (' + new Date().toDateString() + ')';
  temp.textContent = `Temp: ${currentWeatherData.main.temp} °F`;
  wind.textContent = `Wind: ${currentWeatherData.wind.speed} MPH`;
  humid.textContent = `Humidity: ${currentWeatherData.main.humidity} %`;
  disResults.style.display = 'block';
  iconSection.style.display = 'block';
  icon.src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`;
  (fiveDayHeader.style.display = 'flex'), 'flexDirection: row';

  let forecastBoxes = document.getElementById('forecastBoxes');
  forecastBoxes.innerHTML = '';
  // gets the 5 day forecast
  for (let index = 5; index < 40; index += 8) {
    let futureResults = document.createElement('section');
    futureResults.id = 'futureResults';

    let fDate = `<p>Date: ${futureWeatherData.list[index].dt_txt}</p>`;
    let weatherImage = document.createElement('img');
    weatherImage.style.maxWidth = '40px';
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
// creates buttons for the cities searched
async function save(cityName) {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  const cityExists = cities.find((x) => x.toUpperCase() == cityName.toUpperCase()); // will return undefined if cityName is not already saved
  if (cityExists == undefined) {
    cities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(cities));
    let cityBtns = document.getElementById('cityBtns');
    let savedCity = document.createElement('button');
    savedCity.id = 'savedCity';
    savedCity.classList.add('btn', 'btn-secondary', 'btn-lg', 'nav-item');
    savedCity.textContent = cityName;
    savedCity.addEventListener('click', async function () {
      await getWeather(cityName);
    });
    cityBtns.appendChild(savedCity);
  }
}

async function cityLoop() {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  let cityBtns = document.getElementById('cityBtns');

  for (let index = 0; index < cities.length; index++) {
    let savedCity = document.createElement('button');
    savedCity.id = 'savedCity';
    savedCity.classList.add('btn', 'btn-secondary', 'btn-lg', 'nav-item');
    savedCity.textContent = cities[index];
    savedCity.addEventListener('click', async function () {
      await getWeather(cities[index]);
    });
    cityBtns.appendChild(savedCity);
  }
}
