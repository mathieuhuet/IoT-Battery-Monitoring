const secret = require('../secret');


//GET REQUEST /weather
const weatherController = {
  getWeather: async (ctx) => {
    try {
      const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       }
      let response = await fetch(secret.weatherAPI, { 
        method: "GET",
        headers: headersList
      });
      const data = await response.json();
      if (!data) {
        throw new Error('No weather data were retrieved from OpenWeather API.\n this come from weather controller in back-end');
      }
      let weather = {
        current: {},
        hourly: [],
        daily: [],
      };

      
      //WIND SPEED IS MULTIPLY BY 3.6 TO CONVERT METER/SECOND TO KM/H
      //and then it is rounded to one decimal.
      weather.current.clouds = Math.abs(data.current.clouds - 100);
      weather.current.wind_speed = Math.round((data.current.wind_speed * 3.6) * 10) / 10;
      weather.current.icon = checkIcon(data.current.weather[0].icon);

      //Put the next 12Hours in the hourly array of weather object
      for (let i = 0; i < 12; i++) {
        let hourlyWeather = {};
        hourlyWeather.dt = data.hourly[i].dt;
        hourlyWeather.clouds = Math.abs(data.hourly[i].clouds - 100);
        hourlyWeather.wind_speed = Math.round((data.hourly[i].wind_speed * 3.6) * 10) / 10;
        hourlyWeather.wind_gust = Math.round((data.hourly[i].wind_gust * 3.6) * 10) / 10;
        hourlyWeather.icon = checkIcon(data.hourly[i].weather[0].icon);
        weather.hourly.push(hourlyWeather);
      }

      //Put the next 7days in the daily array of weather object
      for (let i = 0; i < 7; i++) {
        let dailyWeather = {};
        dailyWeather.dt = data.daily[i].dt;
        dailyWeather.clouds = Math.abs(data.daily[i].clouds - 100);
        dailyWeather.wind_speed = Math.round((data.daily[i].wind_speed * 3.6) * 10) / 10;
        dailyWeather.wind_gust = Math.round((data.daily[i].wind_gust * 3.6) * 10) / 10;
        dailyWeather.icon = checkIcon(data.daily[i].weather[0].icon);
        weather.daily.push(dailyWeather);
      }

      ctx.status = 200;
      ctx.body = {
        error: false,
        message: 'Weather retrieved succesfully',
        data: weather,
      }

    } catch (error) {
      if (error.message === 'No weather data were retrieved from OpenWeather API.\n this come from weather controller in back-end') {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: error.message,
          data: null,
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Internal server error',
          data: null,
        }
      }
    }
  },
}


function checkIcon (icon) {
  switch(icon) {
    case "04d":
      return "nuages"
    case "04n":
      return "nuages"
    case "01d":
      return "soleil"
    case "01n":
      return "lune"
    case "02d":
      return "soleil-nuage"
    case "02n":
      return "lune-nuage"
    case "03d":
      return "nuage"
    case "03n":
      return "nuage"
    case "09d":
      return "pluie"
    case "09n":
      return "pluie"
    case "10d":
      return "soleil-pluie"
    case "10n":
      return "lune-pluie"
    case "11d":
      return "tonnerre"
    case "11n":
      return "tonnerre"
    case "13d":
      return "neige"
    case "13n":
      return "neige"
    case "50d":
      return "brouillard"
    case "50n":
      return "brouillard"
    default:
      return ""
  }
}

module.exports = weatherController;


//45.462425632505074, -73.71702282440643