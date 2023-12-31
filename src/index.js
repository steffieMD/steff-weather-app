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

const getForecast = () => {
  let userInput = document.querySelector("#search");
  let city = userInput.value;
  let forecastApiUril = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  const showForecast = (response) => {
    let icon1 = document.getElementById("icon-1");
    icon1.src = `${response.data.daily[0].condition.icon_url}`;
    let maxTempOne = document.querySelector("#max-temp-one");
    maxTempOne.innerHTML = `${Math.round(
      response.data.daily[0].temperature.maximum
    )}°`;
    let minTempOne = document.querySelector("#min-temp-one");
    minTempOne.innerHTML = `${Math.round(
      response.data.daily[0].temperature.minimum
    )}°`;

    let icon2 = document.getElementById("icon-2");
    icon2.src = `${response.data.daily[1].condition.icon_url}`;
    let maxTempTwo = document.querySelector("#max-temp-two");
    maxTempTwo.innerHTML = `${Math.round(
      response.data.daily[1].temperature.maximum
    )}°`;
    let minTempTwo = document.querySelector("#min-temp-two");
    minTempTwo.innerHTML = `${Math.round(
      response.data.daily[1].temperature.minimum
    )}°`;

    let icon3 = document.getElementById("icon-3");
    icon3.src = `${response.data.daily[2].condition.icon_url}`;
    let maxTempThree = document.querySelector("#max-temp-three");
    maxTempThree.innerHTML = `${Math.round(
      response.data.daily[2].temperature.maximum
    )}°`;
    let minTempThree = document.querySelector("#min-temp-three");
    minTempThree.innerHTML = `${Math.round(
      response.data.daily[2].temperature.minimum
    )}°`;

    let icon4 = document.getElementById("icon-4");
    icon4.src = `${response.data.daily[3].condition.icon_url}`;
    let maxTempFour = document.querySelector("#max-temp-four");
    maxTempFour.innerHTML = `${Math.round(
      response.data.daily[3].temperature.maximum
    )}°`;
    let minTempFour = document.querySelector("#min-temp-four");
    minTempFour.innerHTML = `${Math.round(
      response.data.daily[3].temperature.minimum
    )}°`;

    let icon5 = document.getElementById("icon-5");
    icon5.src = `${response.data.daily[4].condition.icon_url}`;
    let maxTempFive = document.querySelector("#max-temp-five");
    maxTempFive.innerHTML = `${Math.round(
      response.data.daily[4].temperature.maximum
    )}°`;
    let minTempFive = document.querySelector("#min-temp-five");
    minTempFive.innerHTML = `${Math.round(
      response.data.daily[4].temperature.minimum
    )}°`;
  };

  axios.get(forecastApiUril).then(showForecast);
};

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
h2Header.innerHTML = `${days[changeDate.getDay()]}, ${String(
  changeDate.getHours()
).padStart(2, "0")}:${String(changeDate.getMinutes()).padStart(2, "0")}`;

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

    dateHeader.innerHTML = `${days[date.getDay()]}, ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
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
  getForecast();

  axios.get(apiUrl).then(search);
};

searchButton.addEventListener("click", searchCity);
