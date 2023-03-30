const API = process.env.REACT_APP_API_URL
? process.env.REACT_APP_API_URL + '/weather'
: 'http://localhost:3030/weather';

/*
Get Weather Data
*/
export const WeatherService = {

  //Get Request
  getWeather: async () => {
    try {
      const get = await fetch(API);
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