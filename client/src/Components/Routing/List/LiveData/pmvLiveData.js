import './pmvLiveData.css';
import { PMVService } from '../../../../Services/pmvService';
import { useEffect, useState } from 'react';

function PMVLiveData({ id }) {
  const [pmvData, setPMVData] = useState([])
  useEffect(() => {
    PMVService.getLiveData(id)
    .then(data => {
      setPMVData(data);
    })
  }, [id]);
  return (
    <div className="PMVLiveData">
      <div className='LiveDataContainer'>
        {'Battery voltage : ' + (pmvData && pmvData.voltage ? pmvData.voltage + 'V' : 'No Data')}
      </div>
      <div className='LiveDataContainer'>
        {'Photocell Intensity : ' + (pmvData && pmvData.photocell ? pmvData.photocell : 'No Data')}
      </div>
      <div className='LiveDataContainer'>
        {'Message displayed : ' + (pmvData && pmvData.message ? pmvData.message : 'No Data')}
      </div>
    </div>
  );
}

export default PMVLiveData;