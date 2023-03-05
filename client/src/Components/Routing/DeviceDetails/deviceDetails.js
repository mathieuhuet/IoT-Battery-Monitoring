import './deviceDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DeviceService } from '../../../Services/deviceServiceApi';
import EMCLiveData from '../../LiveData/emcLiveData';
import PMVLiveData from '../../LiveData/pmvLiveData';

function DeviceDetails() {
  const { id } = useParams();
  const [device, setDevice] = useState([]);

  useEffect(() => {
    DeviceService.getSingleDevice(id)
    .then(data => {
      setDevice(data);
    })
  }, []);
  return (
    <div className='DeviceDetails'>
      <div className="DeviceDetailsLeft">
        <h1>{device.id}</h1>
        <h2>{'DEVICE IP = ' + device.ip}</h2>
        {console.log(device, 'REMOVE ME')}
      </div>
      <div className='DeviceDetailsRight'>
        <div className='DeviceDetailsInfo'>
          {device.createdBy}
          <br />
          {device.createdAt}
          <br />
          {device.updatedAt}
        </div>
        <div className='DeviceDetailsData'>
          {device.battery === 'pmv' ? <PMVLiveData id={device.id} /> : <EMCLiveData id={device.id} />}
        </div>
      </div>
    </div>
  );
}

export default DeviceDetails;