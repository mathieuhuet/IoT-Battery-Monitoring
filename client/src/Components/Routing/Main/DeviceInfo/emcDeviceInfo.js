import './emcDeviceInfo.css';
import { EMCService } from '../../../../Services/emcService';
import { useEffect, useState } from 'react';

function EMCDeviceInfo({ id }) {
  const [emcData, setEMCData] = useState([])
  useEffect(() => {
    EMCService.getLiveData(id)
    .then(data => {
      setEMCData(data);
    })
  }, [id]);
  return (
    <div className="EMCDeviceInfo">
      <div className='EMCDataContainer'>
        {'Battery voltage : ' + (emcData && emcData.voltage ? emcData.voltage + 'V' : '')}
      </div>
      <div className='EMCDataContainer'>
        {'Device Temperature : ' + (emcData && emcData.temperature ? emcData.temperature + 'C' : '')}
      </div>
      <div className='EMCDataContainer'>
        {'Current Load : ' + (emcData && emcData.load ? emcData.load + 'A' : '')}
      </div>
      <div className='EMCDataContainer'>
        {'Current Charge : ' + (emcData && emcData.charge ? emcData.charge + 'A' : '')}
      </div>
    </div>
  );
}

export default EMCDeviceInfo;