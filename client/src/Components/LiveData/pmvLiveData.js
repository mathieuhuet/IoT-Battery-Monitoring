import './pmvLiveData.css';
import { PMVService } from '../../Services/pmvService';
import { useEffect, useState } from 'react'
import Spinner from '../../Spinner';


/*
Render Live data from the PMv device passed in argument.
*/

function PMVLiveData({ id }) {
  const [pmvData, setPMVData] = useState({
    voltage: 0,
    photocell: 0,
    message: '',
  })
  useEffect(() => {
    if (id) {
      PMVService.getLiveData(id)
      .then(data => {
        if (data) {
          setPMVData(data);
        }
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