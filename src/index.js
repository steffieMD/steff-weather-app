let changeDate = new Date();
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

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

let h2Header = document.querySelector("h2");
h2Header.innerHTML = `${days[changeDate.getDay()]} ${changeDate.getDate()}th ${
  months[changeDate.getMonth()]
}, ${changeDate.getHours()}:${changeDate.getMinutes()}`;

let searchButton = document.querySelector("#search-button");

const searchCity = () => {
  let userInput = document.querySelector("#search");

  let city = userInput.value;
  let apiKey = "8b1a1ta30dba43658ff8edf2ddfbo830";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  const search = (response) => {
    console.log(response.data);

    let header = document.querySelector("h1");

    if (city.length === 0) {
      header.innerHTML = `No city inputed!`;
    } else {
      header.innerHTML = `${response.data.city}, ${response.data.country}`;
    }

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
    humidity.innerHTML = `Humidity:  ${response.data.temperature.humidity}%`;

    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = `Wind: ${response.data.wind.speed}mph`;

    let dewPoint = document.querySelector("#degree");
    dewPoint.innerHTML = `Dew Point: ${response.data.wind.degree}°`;

    const getDate = () => {
      let timeMS = response.data.time;
      console.log(timeMS);
      let date = new Date(timeMS);
      console.log(date);

      let dateHeader = document.querySelector("h2");

      dateHeader.innerHTML = `${days[date.getDay()]} ${date.getDate()}th ${
        months[date.getMonth()]
      }, ${date.getHours()}:${date.getMinutes()}`;
    };

    getDate();
  };
  axios.get(apiUrl).then(search);
};

searchButton.addEventListener("click", searchCity);
