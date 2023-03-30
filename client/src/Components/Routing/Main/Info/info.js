import './info.css';
import WeatherInfo from './WeatherInfo/weatherInfo';
import WeatherButtonComponent from './WeatherButtonComponent/weatherButtonComponent'
import { useState, useEffect } from 'react';
import { WeatherService } from '../../../../Services/weatherApi';

/*
Where the app gather the weather information and displays it on the screen on click (Yes info is a bad name... im very sorry)
*/

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
            <WeatherButtonComponent 
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
            <WeatherButtonComponent 
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