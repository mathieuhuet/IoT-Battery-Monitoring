import './weatherInfo.css';
import { format } from 'date-fns';
import { WiCloudyGusts } from "react-icons/wi";
import { WiCloud } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiNightClear } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiNightAltPartlyCloudy } from "react-icons/wi";
import { WiShowers } from "react-icons/wi";
import { WiDayShowers } from "react-icons/wi";
import { WiNightShowers } from "react-icons/wi";
import { WiThunderstorm } from "react-icons/wi";
import { WiSnow } from "react-icons/wi";
import { WiFog } from "react-icons/wi";

function weatherInfo({ weather }) {

  function checkIcon (icon) {
    switch(icon) {
      case "nuages":
        return <WiCloudy />
      case "soleil":
        return <WiDaySunny />
      case "nuage":
        return <WiCloud />
      case "lune":
        return <WiNightClear />
      case "soleil-nuage":
        return <WiDayCloudy />
      case "lune-nuage":
        return <WiNightAltPartlyCloudy />
      case "pluie":
        return <WiShowers />
      case "soleil-pluie":
        return <WiDayShowers />
      case "lune-pluie":
        return <WiNightShowers />
      case "tonnerre":
        return <WiThunderstorm />
      case "neige":
        return <WiSnow />
      case "brouillard":
        return <WiFog />
      default:
        return;
    }
  }
  const topHourly = [];
  const middleHourly = [];
  for (let i = 0; i < 5; i++) {
    topHourly.push(weather.hourly[i]);
  }
  for (let i = 5; i < 12; i++) {
    middleHourly.push(weather.hourly[i]);
  }



  return (
    <div className="InfoWeather">
      <div className='topInfo'>
        <div className='currentWeather'>
          <div className='currentCloud'>
            <h1>{checkIcon(weather.current.icon)}</h1>
            {weather.current.clouds + '%'}
          </div>
          <div className='currentWind'>
            <h2><WiCloudyGusts /></h2>
            {weather.current.wind_speed + 'km/h'}
          </div>
        </div>
        <div className='topHourly'>
        {topHourly.map((hourly) => 
          <div className='hourlyList' key={hourly.dt}>
            <div className='leftHourly'>
              <div className='weatherTime'>
                {format(new Date(hourly.dt * 1000), 'HH') + 'h00'}
              </div>
              <div className='weatherLogo'>
                <h2>{checkIcon(hourly.icon)}</h2>
              </div>
              <div className='weatherClouds'>
                {hourly.clouds + '%'}
              </div>
            </div>
            <div className='rightHourly'>
              <div className='weatherLogo Wind'>
                <WiCloudyGusts />
              </div>
              {hourly.wind_speed + 'km/h'}
              <br />
              {hourly.wind_gust + 'km/h'}
            </div>
          </div>
        )}
        </div>
      </div>
      <div className='middleInfo'>
        <div className='wall'>
          <br />
        </div>
        {middleHourly.map((hourly) => 
          <div className='hourlyList' key={hourly.dt}>
            <div className='leftHourly'>
              <div className='weatherTime'>
                {format(new Date(hourly.dt * 1000), 'HH') + 'h00'}
              </div>
              <div className='weatherLogo'>
                <h2>{checkIcon(hourly.icon)}</h2>
              </div>
              <div className='weatherClouds'>
                {hourly.clouds + '%'}
              </div>
            </div>
            <div className='rightHourly'>
              <div className='weatherLogo Wind'>
                <WiCloudyGusts />
              </div>
              {hourly.wind_speed + 'km/h'}
              <br />
              {hourly.wind_gust + 'km/h'}
            </div>
          </div>
        )}
      </div>
      <div className='bottomInfo'>
        <div className='Wall'>
          <br />
          <p>l</p>
        </div>
        {weather.daily.map((daily) => 
          <div className='dailyList' key={daily.dt}>
            <div className='leftDaily'>
              <div className='weatherTime Day'>
                {format(new Date(daily.dt * 1000), 'MM/dd')}
              </div>
              <div className='weatherLogo'>
                <h2>{checkIcon(daily.icon)}</h2>
              </div>
              <div className='weatherClouds'>
                {daily.clouds + '%'}
              </div>
            </div>
            <div className='rightDaily'>
              <div className='weatherLogo Wind'>
                <WiCloudyGusts />
              </div>
              {daily.wind_speed + 'km/h'}
              <br />
              {daily.wind_gust + 'km/h'}
            </div>
          </div>
        )}
      </div>
    </div>
  );

}

export default weatherInfo;