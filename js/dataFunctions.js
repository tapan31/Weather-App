const WEATHER_API_KEY = "f1cc103c9a214fc1fb5b49b6a3c8dcfe";

export const cleanText = (text) => {
  const regex = / {2,}/g;
  const entryText = text.replaceAll(regex, " ");
  return entryText;
};

export const getCoordsFromApi = async (entryText, lat, lon) => {
  if (entryText === "") {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(url);
    return data;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${entryText}&appid=${WEATHER_API_KEY}&units=metric`;
  const encodedUrl = encodeURI(url);
  // console.log(encodedUrl);
  const response = await fetch(encodedUrl);
  const data = await response.json();

  return data;
};
