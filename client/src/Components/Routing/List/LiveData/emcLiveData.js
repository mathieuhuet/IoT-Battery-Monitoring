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
    <div className="emcLiveData">
      {console.log(emcData, 'LIVEDATA')}
    </div>
  );
}

export default EMCLiveData;