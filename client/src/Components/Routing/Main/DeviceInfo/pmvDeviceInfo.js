import './pmvDeviceInfo.css';
import { PMVService } from '../../../../Services/pmvService'
import { useEffect, useState } from 'react';

function PMVDeviceInfo({ id }) {
  const [pmvData, setPMVData] = useState([])
  useEffect(() => {
    PMVService.getLiveData(id)
    .then(data => {
      setPMVData(data);
    })
  }, [id]);
  return (
    <div className="PMVDeviceInfo">
      <div className='PMVDataContainer'>
        {'Battery voltage : ' + (pmvData && pmvData.voltage ? pmvData.voltage + 'V' : '')}
      </div>
      <div className='PMVDataContainer'>
        {'Photocell Intensity : ' + (pmvData && pmvData.photocell ? pmvData.photocell : '')}
      </div>
      <div className='PMVDataContainer'>
        {'Message displayed : ' + (pmvData && pmvData.message ? pmvData.message : '')}
      </div>
    </div>
  );
}

export default PMVDeviceInfo;