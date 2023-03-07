import './emcLiveData.css';
import { EMCService } from '../../Services/emcService';
import { useEffect, useState } from 'react';
import Spinner from '../../Spinner';

/*
Render Live data from the EMC device passed in argument.
*/


function EMCLiveData({ id }) {
  const [emcData, setEMCData] = useState({
    voltage: 0,
    temperature: 0,
    load: 0,
    charge: 0,
  })
  useEffect(() => {
    if (id) {
      EMCService.getLiveData(id)
      .then(data => {
        if (data) {
          setEMCData(data);
        }
      })
    }
  }, [id]);
  return (
    <div>
      {emcData && emcData.voltage ? <RenderData /> : <LoadingData />}
    </div>
  );

  function RenderData () {
    return  (
      <div className="EMCDeviceInfo">
        <div className='EMCDataContainer'>
          <div className='EMCDesc'>Battery voltage</div><div className='EMCVoltage'>{emcData.voltage} V</div>
        </div>
        <div className='EMCDataContainer'>
          <div className='EMCDesc'>Device Temperature</div><div className='EMCTemperature'>{emcData.temperature} C</div>
        </div>
        <div className='EMCDataContainer'>
          <div className='EMCDesc'>Current Load</div><div className='EMCLoad'>{emcData.load} A</div>
        </div>
        <div className='EMCDataContainer'>
          <div className='EMCDesc'>Current Charge</div><div className='EMCCharge'>{emcData.charge} A</div>
        </div>
      </div>
    );
  }
  function LoadingData () {
    return (
      <div className='EMCDeviceInfo'>
        <Spinner />
      </div>
    );
  }
}

export default EMCLiveData;