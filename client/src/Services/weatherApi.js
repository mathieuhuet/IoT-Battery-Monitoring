const URL = 'http://localhost:3030/weather';

/*
Get Weather Data.
*/



export const WeatherService = {

  //Get Request
  getWeather: async () => {
    try {
      const get = await fetch(URL);
      const response = await get.json();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.log(`ERROR AT getEvents services function : ${error}`);
    }
  },

}