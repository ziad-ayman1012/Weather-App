let homeBtn = document.querySelector('#homeBtn')
let contactBtn = document.querySelector('#contactBtn');
let contactPage = document.querySelector('#contactPage');
let home = document.querySelector('#home');
let locationInput = document.getElementById("locationInput");
let cityName = document.getElementById("cityName");
let dayToday = document.getElementById("dayToday");
let dateToday = document.getElementById("dateToday");
let tempFirstDay = document.getElementById("tempFirstDay");
let weatherStatus = document.getElementById("weatherStatus");
let humidityOfCity = document.getElementById("humidityOfCity");
let windDir = document.getElementById("windDir");
let todayStatus = document.getElementById("todayStatus");
let speedOfWind = document.getElementById("speedOfWind");
let tommDayName = document.getElementById("tommDayName");
let secDayImg = document.getElementById("secDayImg");
let maxTempSecDay = document.getElementById("maxTempSecDay");
let minTempSecDay = document.getElementById("minTempSecDay");
let secDayStatus = document.getElementById("secDayStatus");
let thirdDayDate = document.getElementById("thirdDayDate");
let thirdDayImg = document.getElementById("thirdDayImg");
let maxTempOfThird = document.getElementById("maxTempOfThird");
let minTempOfThird = document.getElementById("minTempOfThird");
let thirdDayWeatherStatus = document.getElementById("thirdDayWeatherStatus");



contactBtn.addEventListener('click', function (e) {
    contactPage.classList.remove('d-none');
})
homeBtn.addEventListener('click', function (e) {
  contactPage.classList.add("d-none");
});
home.addEventListener('click', function (e) {
  contactPage.classList.add("d-none");
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    getWeatherData(`${lat},${long}`);

  })
} else {
  console.log(false);
}

async function getWeatherData(query) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=80a9037bfc7649bf86e173218242106`
  );
  let data = await res.json();
  displayTodayWeather(data);
  displayTommWeather(data);
  displayThirdDayWeather(data);
}

locationInput.addEventListener('input', function (e) {
  getWeatherData(e.target.value);
})

function displayTodayWeather(data) {
  
  let todayDate = data.current.last_updated;
  let date = new Date(todayDate);
  let todayWeekDay = date.toLocaleString('en-us', { weekday: 'long'}); // day name
  let todayDay = date.getDate(); // day number
  let todayMonth = date.toLocaleString('en-us', { month: 'long' }); //month name
  dayToday.innerHTML = todayWeekDay;
  dateToday.innerHTML = `${todayDay} ${todayMonth}`
  let locName = data.location.name; //location name
  cityName.innerHTML = locName;
  let tempDay = data.current.temp_c;
  tempFirstDay.innerHTML = tempDay + `<sup>o</sup>C`;
  let todayCondition = data.current.condition.text;
  weatherStatus.innerHTML = todayCondition;
  let todayIcon = data.current.condition.icon;
  todayStatus.setAttribute('src', todayIcon);
  let windHumidity = data.current.humidity;
  humidityOfCity.innerHTML = windHumidity + `%`;
  let windSpeed = data.current.wind_kph;
  speedOfWind.innerHTML = windSpeed +`km/h`;
  let windDirection = data.current.wind_dir;
  windDir.innerHTML = windDirection; 
}

function displayTommWeather({forecast}) {
  let date = new Date(forecast.forecastday[1].date);
  let tommDay = date.toLocaleString('en-us', { weekday: 'long' });// tommorow
  tommDayName.innerHTML = tommDay;
  let secDayIcon = forecast.forecastday[1].day.condition.icon;
  secDayImg.setAttribute('src', secDayIcon);
  let maxTemp = forecast.forecastday[1].day.maxtemp_c;
  maxTempSecDay.innerHTML = maxTemp + `<sup>o</sup>C`;
  let minTemp = forecast.forecastday[1].day.mintemp_c;
  minTempSecDay.innerHTML = minTemp + `<sup>o</sup>C`;
  let secDayText = forecast.forecastday[1].day.condition.text;
  secDayStatus.innerHTML = secDayText;
}

function displayThirdDayWeather({forecast}) {
  let date = new Date(forecast.forecastday[2].date);
  let thirdDay = date.toLocaleString('en-us', { weekday: 'long' });
  thirdDayDate.innerHTML = thirdDay;
  let thirdDayIcon = forecast.forecastday[2].day.condition.icon;
  thirdDayImg.setAttribute('src', thirdDayIcon);
  let maxTempThiDay = forecast.forecastday[2].day.maxtemp_c;
  maxTempOfThird.innerHTML = maxTempThiDay + `<sup>o</sup>C`;
  let minTempThiDay = forecast.forecastday[2].day.mintemp_c;
  minTempOfThird.innerHTML = minTempThiDay + `<sup>o</sup>C`;
  let thirdDayText = forecast.forecastday[2].day.condition.text;
  thirdDayWeatherStatus.innerHTML = thirdDayText;

  
}











