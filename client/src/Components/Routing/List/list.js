import './list.css';
import { DeviceService } from '../../../Services/deviceServiceApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <h1>EMC</h1>
        {emc.map((device) => 
          <div className='EMCDevice' key={device.id}>
            <Link to={'/device/' + device.id}>
              <b>{device.name}</b>
            </Link>
            <EMCLiveData 
              id={device.id}
            />
          </div>
        )}
      </div>
      <div className='PMVList'>
        <h1>PMV</h1>
        {pmv.map((device) =>
          <div className='PMVDevice' key={device.id}>
            <b>{device.name}</b>
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