import './pmvLiveData.css';
import { PMVService } from '../../Services/pmvService';
import { useEffect, useState } from 'react'
import Spinner from '../../Spinner';

function PMVLiveData({ id }) {
  const [pmvData, setPMVData] = useState([])
  useEffect(() => {
    if (id) {
      PMVService.getLiveData(id)
      .then(data => {
        setPMVData(data);
      })
    }
  }, [id]);
  return (
    <div>
      {pmvData && pmvData.voltage ? <RenderData /> : <LoadingData />}
    </div>
  );
  function RenderData () {
    return (
      <div className="PMVDeviceInfo">
        <div className='PMVDataContainer'>
          <div className='PMVDesc'>Battery voltage</div><div className='PMVVoltage'>{pmvData.voltage} V</div>
        </div>
        <div className='PMVDataContainer'>
          <div className='PMVDesc'>Photocell Intensity</div><div className='PMVPhotocell'>{pmvData.photocell}</div>
        </div>
        <div className='PMVDataContainer'>
          <div className='PMVDesc'>Message displayed</div><div className='PMVMessage'>{pmvData.message}</div>
        </div>
      </div>
    );
  }
  function LoadingData () {
    return (
      <div className='PMVDeviceInfo'>
        <Spinner />
      </div>
    );
  }
}

export default PMVLiveData;