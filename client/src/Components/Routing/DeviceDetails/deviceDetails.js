import './deviceDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DeviceService } from '../../../Services/deviceServiceApi';

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
    <div className="DeviceDetails">
      <h1>{device.id}</h1>
      <h2>{'DEVICE IP = ' + device.ip}</h2>
      {console.log(device, 'REMOVE ME')}
    </div>
  );
}

export default DeviceDetails;