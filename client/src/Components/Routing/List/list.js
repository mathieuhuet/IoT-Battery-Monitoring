import './list.css';
import { DeviceService } from '../../../Services/deviceServiceApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EMCLiveData from '../../LiveData/emcLiveData';
import PMVLiveData from '../../LiveData/pmvLiveData';
import PMV from '../../../Assets/pmvicon.png';
import Battery0 from '../../../Assets/battery0.png';
import Battery1 from '../../../Assets/battery1.png';
import Battery2 from '../../../Assets/battery2.png';
import Battery3 from '../../../Assets/battery3.png';
import Battery4 from '../../../Assets/battery4.png';



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
        <div className='EMCTitle'><img src={Battery1} alt=''/><img src={Battery4} alt=''/><img src={Battery2} alt=''/><img src={Battery0} alt=''/><img src={Battery3} alt=''/>EMC<img src={Battery1} alt=''/><img src={Battery4} alt=''/><img src={Battery2} alt=''/><img src={Battery0} alt=''/><img src={Battery3} alt=''/></div>
        {emc.map((device) => 
          <div key={device.id}>
          <Link to={'/device/devices/' + device.id}>
            <div className='EMCDevice' >
              <div className='DeviceTitle'>{device.name}</div>
              <EMCLiveData 
                id={device.id}
              />
            </div>
          </Link>
          </div>
        )}
      </div>
      <div className='PMVList'>
        <div className='PMVTitle'><img src={PMV} alt=''/> PMV <img src={PMV} alt=''/></div>
        {pmv.map((device) =>
          <div key={device.id}>
            <Link to={'/device/devices/' + device.id}>
              <div className='PMVDevice'>
                <div className='DeviceTitle'>{device.name}</div>
                <PMVLiveData 
                  id={device.id}
                />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default List;