import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.post("/api/weather", async (req, res) => {
  const { zipCode, countryCode } = req.body;
  const apiKey = "your_API_Key";

  console.log(req, res);
  const zipApiUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`;

  try {
    const geoResponse = await axios.get(zipApiUrl);
    const lat = geoResponse.data.lat;
    const lon = geoResponse.data.lon;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherResponse = await axios.get(weatherApiUrl);
    const weatherData = {
      temp: weatherResponse.data.main.temp,
      weather: weatherResponse.data.weather[0].description,
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving weather data");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
