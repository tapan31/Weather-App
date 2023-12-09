import { cleanText, getCoordsFromApi } from "./dataFunctions.js";
import {
  disableButton,
  enableButton,
  updateDisplay,
  fadeDisplay,
  loader,
  displayError,
} from "./domFunctions.js";

const initApp = () => {
  // console.log("Hello");

  const form = document.getElementById("searchBar__form");
  form.addEventListener("submit", submitNewLocation);

  getGeoWeather();
};

document.addEventListener("DOMContentLoaded", initApp);

const getGeoWeather = () => {
  // if (!navigator.geolocation) geoError();
  if (navigator.geolocation) {
    loader();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
};

const geoSuccess = async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fadeDisplay();
  try {
    const coordsObj = await getCoordsFromApi("", lat, lon);
    const locationObj = {
      lat: coordsObj.coord.lat,
      lon: coordsObj.coord.lon,
      name: coordsObj.name,
      temp: coordsObj.main.temp,
      maxTemp: coordsObj.main.temp_max,
      minTemp: coordsObj.main.temp_min,
      feelsLike: coordsObj.main.feels_like,
      humidity: coordsObj.main.humidity,
      windSpeed: coordsObj.wind.speed,
      description: coordsObj.weather[0].description,
      iconName: coordsObj.weather[0].main,
    };
    loader();
    updateDisplay(locationObj);
  } finally {
    fadeDisplay();
  }
};

const geoError = (errObj) => {
  const errMsg = errObj
    ? "Please allow access to location"
    : "GeoLocation Not Supported";
  // console.log(errMsg);
  loader();
  displayError(errMsg);
};

const submitNewLocation = async (event) => {
  event.preventDefault();
  fadeDisplay();
  // console.log("event fired");
  disableButton();
  const text = document.getElementById("searchBar__text").value;
  const validText = cleanText(text).trim();

  if (validText === "") {
    // alert("Please enter a valid city or country");
    displayError("Please Enter a Valid City");
    enableButton();
    fadeDisplay();
    return;
  }

  const coordsObj = await getCoordsFromApi(validText);
  if (coordsObj.cod !== 200) {
    if (coordsObj.cod === "404") {
      displayError("City Not Found!!!");
    } else {
      displayError("Something Went Wrong, Please Try Again");
    }
    enableButton();
    fadeDisplay();
    return;
  }

  const locationObj = {
    name: coordsObj.name,
    temp: coordsObj.main.temp,
    maxTemp: coordsObj.main.temp_max,
    minTemp: coordsObj.main.temp_min,
    feelsLike: coordsObj.main.feels_like,
    humidity: coordsObj.main.humidity,
    windSpeed: coordsObj.wind.speed,
    description: coordsObj.weather[0].description,
    iconName: coordsObj.weather[0].main,
  };
  enableButton();

  updateDisplay(locationObj);
  fadeDisplay();
};
