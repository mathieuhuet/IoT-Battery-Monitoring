import './list.css';
import { DeviceService } from '../../../Services/deviceServiceApi';
import { useEffect, useState } from 'react';
import EMCLiveData from './LiveData/emcLiveData';
import PMVLiveData from './LiveData/pmvLiveData';



function List () {

  const [pmv, setPMV] = useState([]);
  const [emc, setEMC] = useState([]);
  useEffect(() => {
    DeviceService.getDevices()
    .then(data => {
      let pmvArray = [];
      let emcArray = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].battery === 'pmv') {
          pmvArray.push(data[i]);
        } else {
          emcArray.push(data[i])
        }
      }
      setEMC(emcArray);
      setPMV(pmvArray);
    })
  }, []);


  return (
    <div className="List">
      <div className='EMCList'>
        {emc.map((device) => 
          <div className='DeviceList' key={device.id}>
            {device.name}
            <br />
            {device.ip + ':'}{device.port}
            <br />
            <EMCLiveData 
              id={device.id}
            />
          </div>
        )}
      </div>
      <div className='PMVList'>
        {pmv.map((device) =>
          <div className='DeviceList' key={device.id}>
            {device.name}
            <br />
            {device.ip + ':'}{device.port}
            <br />
            <PMVLiveData 
              id={device.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default List;