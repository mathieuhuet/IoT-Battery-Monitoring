import './emcLiveData.css';
import { EMCService } from '../../../../Services/emcService';
import { useEffect, useState } from 'react';

function EMCLiveData({ id }) {
  const [emcData, setEMCData] = useState([])
  useEffect(() => {
    EMCService.getLiveData(id)
    .then(data => {
      setEMCData(data);
    })
  }, [id]);
  return (
    <div className="EMCLiveData">
      <div className='LiveDataContainer'>
        {'Battery voltage : ' + (emcData && emcData.voltage ? emcData.voltage + 'V' : 'No Data')}
      </div>
      <div className='LiveDataContainer'>
        {'Device Temperature : ' + (emcData && emcData.temperature ? emcData.temperature + 'C' : 'No Data')}
      </div>
      <div className='LiveDataContainer'>
        {'Current Load : ' + (emcData && emcData.load ? emcData.load + 'A' : 'No Data')}
      </div>
      <div className='LiveDataContainer'>
        {'Current Charge : ' + (emcData && emcData.charge ? emcData.charge + 'A' : 'No Data')}
      </div>
    </div>
  );
}

export default EMCLiveData;