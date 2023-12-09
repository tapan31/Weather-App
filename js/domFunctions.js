// Initialize Toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: true,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 2500,
  extendedTimeOut: 1000,
};

export const disableButton = () => {
  const button = document.querySelector("#searchBar__button");
  const input = document.getElementById("searchBar__text");
  input.disabled = true;
  button.disabled = true;
  //   console.log(button);
  //   console.log(input);
  const i = button.firstElementChild;
  i.classList.remove("fa-solid", "fa-magnifying-glass");
  i.classList.add("fas", "fa-sync", "fa-spin");

  //   <i class="fas fa-sync fa-spin none"></i>;
};

export const updateDisplay = (locationObj) => {
  // console.log(locationObj);
  // fadeDisplay();

  clearDisplay();
  if (locationObj.lat && locationObj.lon) {
    updateLocation("", locationObj.lon, locationObj.lat);
  } else {
    updateLocation(locationObj.name);
  }

  const temp = createElement(parseInt(locationObj.temp), "temp");
  const high = createElement(`High: ${parseInt(locationObj.maxTemp)}°`, "high");
  const low = createElement(`Low: ${parseInt(locationObj.minTemp)}°`, "low");
  const desc = createElement(locationObj.description, "desc");
  const feelsLike = createElement(
    `Feels like ${locationObj.feelsLike}°`,
    "feelsLike"
  );
  const icon = updateIcon(locationObj.iconName);

  // console.log(temp);
  // console.log(high);
  // console.log(low);
  // console.log(desc);
  // console.log(feelsLike);
  // console.log(icon);

  const ccArray = [temp, icon, high, low, desc, feelsLike];

  displayCurrentConditions(ccArray, locationObj);

  // fadeDisplay();
  setFocusOnSearch();
};

const createElement = (text, classes) => {
  const div = document.createElement("div");
  if (classes === "temp") {
    const span = document.createElement("span");
    span.className = "unit";
    span.textContent = "C";
    if (text < 0) {
      div.style.fontSize = "4.7rem";
    }
    const textElem = document.createTextNode(`${text}°`);
    div.classList.add(classes);
    div.appendChild(textElem);
    div.appendChild(span);
    return div;
  } else {
    div.textContent = text;
    div.classList.add(classes);

    return div;
  }
};

const updateIcon = (iconName) => {
  const div = document.createElement("div");
  div.className = "icon";

  const img = document.createElement("img");

  switch (iconName) {
    case "Clear":
      img.setAttribute("src", "./img/clear.png");
      break;
    case "Clouds":
      img.setAttribute("src", "./img/clouds.png");
      break;
    case "Drizzle":
      img.setAttribute("src", "./img/drizzle.png");
      break;
    case "Snow":
      img.setAttribute("src", "./img/snow.png");
      break;
    case "Mist":
      img.setAttribute("src", "./img/mist.png");
      break;
    case "Rain":
      img.setAttribute("src", "./img/rain.png");
      break;

    default:
      img.setAttribute("src", "./img/clear.png");
      break;
  }

  div.appendChild(img);

  return div;
};

const updateLocation = (city, lon, lat) => {
  const location = document.querySelector(".currentForecast__location");
  // console.log(location);
  if (city === "") {
    let lonString = lon.toString();
    let latString = lat.toString();
    location.innerText = `Lon: ${lonString.slice(
      0,
      5
    )} | Lat: ${latString.slice(0, 5)}`;
    location.style.fontSize = "1.5rem";
  } else {
    location.innerText = city;
    location.style.fontSize = "2rem";
  }
};

const displayCurrentConditions = (ccArray, locationObj) => {
  const currentForecast = document.querySelector(
    ".currentForecast__conditions"
  );
  for (let i = 0; i < ccArray.length; i++) {
    currentForecast.appendChild(ccArray[i]);
  }

  const divHumid = document.createElement("div");
  divHumid.className = "humidity";

  divHumid.innerHTML = `
            <img src="img/humidity.png" alt="Humidity" width="50" height="50" />
            <div class="humidity__text">
              <span class="big htext">${locationObj.humidity}%</span> <br />
              Humidity
            </div>
  `;

  const divWSpeed = document.createElement("div");
  divWSpeed.className = "windSpeed";
  divWSpeed.innerHTML = `
          <img src="img/wind.png" alt="Wind Speed" width="50" height="50" />
            <div class="windSpeed__text">
              <span class="big wtext">${locationObj.windSpeed} km/h</span><br />
              Wind Speed
            </div>
  
  `;

  currentForecast.append(divHumid, divWSpeed);

  // const hText = document.querySelector(".htext");
  // hText.textContent = `${locationObj.humidity}%`;

  // const wText = document.querySelector(".wtext");
  // wText.textContent = `${locationObj.windSpeed} km/h`;
};

const setFocusOnSearch = () => {
  document.getElementById("searchBar__text").focus();
};

export const enableButton = () => {
  const button = document.querySelector("#searchBar__button");
  button.disabled = false;
  const input = document.getElementById("searchBar__text");
  input.disabled = false;
  //   console.log(button);
  //   console.log(input);
  const i = button.firstElementChild;
  i.classList.remove("fas", "fa-sync", "fa-spin");
  i.classList.add("fa-solid", "fa-magnifying-glass");
};

export const fadeDisplay = () => {
  const currentForecast = document.querySelector(".currentForecast");
  currentForecast.classList.toggle("zero-vis");
  currentForecast.classList.toggle("fade-in");
  // console.log(currentForecast);
};

const clearDisplay = () => {
  const input = document.getElementById("searchBar__text");
  input.value = "";
  const location = document.querySelector(".currentForecast__location");
  location.innerText = "";
  const currentForecast = document.querySelector(
    ".currentForecast__conditions"
  );
  deleteContents(currentForecast);
};

export const displayError = (msg, type) => {
  toastr.error(msg);
};

const deleteContents = (currentForecast) => {
  let child = currentForecast.lastElementChild;
  while (child) {
    currentForecast.removeChild(child);
    child = currentForecast.lastElementChild;
  }
};

// Loader
export const loader = () => {
  const loaderIcon = document.querySelector("#loader");

  loaderIcon.classList.toggle("none");
  loaderIcon.classList.toggle("loader-wrapper");
};
