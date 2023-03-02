import './weather.css';
import { WiDayFog } from "react-icons/wi";


function Weather({ infoStatus, setInfoStatus }) {
  return (
    <div className="Weather" onClick={() => {
      infoStatus === 'weather' ?
      setInfoStatus('blank') : 
      setInfoStatus('weather')
      }}>
      <WiDayFog />
    </div>
  );
}

export default Weather;