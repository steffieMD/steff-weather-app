const changeDate = new Date();
const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const apiKey = "8b1a1ta30dba43658ff8edf2ddfbo830";

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(
    (data) => {
      const { latitude, longitude } = data.coords;
      let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

      console.log(">>>>", data);
      axios.get(apiUrl).then(search);
    },
    (error) => {
      console.log(">>>>>", error);
    }
  );
});

let h2Header = document.querySelector("h2");
h2Header.innerHTML = `${days[changeDate.getDay()]} ${changeDate.getDate()}th ${
  months[changeDate.getMonth()]
}, ${changeDate.getHours()}:${changeDate.getMinutes()}`;

let searchButton = document.querySelector("#search-button");

const search = (response) => {
  let header = document.querySelector("h1");

  header.innerHTML = `${response.data.city}, ${response.data.country}`;

  let temperature = document.querySelector("strong");
  temperature.innerHTML = Math.round(response.data.temperature.current);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.innerHTML = `<img class="icon" src="${response.data.condition.icon_url}" alt = "${response.data.condition.icon}">`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.temperature.feels_like
  )}`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${response.data.temperature.pressure}mbar`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` ${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}mph`;

  let dewPoint = document.querySelector("#degree");
  dewPoint.innerHTML = `Dew Point: ${response.data.wind.degree}°`;

  const getDate = () => {
    let timeMS = response.data.time;

    let date = new Date(timeMS);

    let dateHeader = document.querySelector("h2");

    dateHeader.innerHTML = `${days[date.getDay()]} ${date.getDate()}th ${
      months[date.getMonth()]
    }, ${date.getHours()}:${date.getMinutes()}`;
  };

  getDate();
};

const searchCity = (e) => {
  e.preventDefault();
  let userInput = document.querySelector("#search");

  let city = userInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  let header = document.querySelector("h1");

  if (city.length === 0) {
    header.innerHTML = `No city inputed!`;
  }

  axios.get(apiUrl).then(search);
};

searchButton.addEventListener("click", searchCity);
