import './weatherButtonComponent.css';
import { WiDayFog } from "react-icons/wi";


function WeatherButtonComponent({ infoStatus, setInfoStatus }) {
  return (
    <div className="WeatherButtonComponent" onClick={() => {
      infoStatus === 'weather' ?
      setInfoStatus('blank') : 
      setInfoStatus('weather')
      }}>
      <div className='WeatherLogo'>
        <WiDayFog />
      </div>
    </div>
  );
}

export default WeatherButtonComponent;