import './info.css';
import WeatherInfo from './WeatherInfo/weatherInfo';
import Weather from './Weather/weather'
import { useState, useEffect } from 'react';
import { WeatherService } from '../../../../Services/weatherApi';

function Info() {

  const [weather, setWeather] = useState({
    current: {},
    hourly: [],
    daily: [],
  }); 
  const [infoStatus, setInfoStatus] = useState('blank');
  
  //GET
  useEffect(() => {
    WeatherService.getWeather()
    .then(data => {
      setWeather(data);
    })
  }, []);


  if (infoStatus === 'weather') {
    return (
      <div className='Overlay'>
        <div className='InfoContainer'>
          <div className='Info'>
            <WeatherInfo 
              weather={weather}
            />
          </div>
        </div>
        <div className="WeatherButtonContainer">
          <div className='WeatherButton'>
            <Weather 
              infoStatus={infoStatus}
              setInfoStatus={setInfoStatus}
            /> 
          </div>    
        </div>
      </div>
    );
  } else {
    return (
      <div className='Overlay'>
        <div className='InfoContainer'>
          <div className='Info'>

          </div>
        </div>
        <div className="WeatherButtonContainer">
          <div className="WeatherButton">
            <Weather 
              infoStatus={infoStatus}
              setInfoStatus={setInfoStatus}
            />     
          </div>
        </div>
      </div>
    )
  }

}

export default Info;