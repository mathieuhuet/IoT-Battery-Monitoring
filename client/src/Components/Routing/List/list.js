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
        <div className='EMCTitle'><img src={Battery1} /><img src={Battery4} /><img src={Battery2} /><img src={Battery0} /><img src={Battery3} />EMC<img src={Battery1} /><img src={Battery4} /><img src={Battery2} /><img src={Battery0} /><img src={Battery3} /></div>
        {emc.map((device) => 
          <Link to={'/device/' + device.id}>
            <div className='EMCDevice' key={device.id}>
              <div className='DeviceTitle'>{device.name}</div>
              <EMCLiveData 
                id={device.id}
              />
            </div>
          </Link>
        )}
      </div>
      <div className='PMVList'>
        <div className='PMVTitle'><img src={PMV} /> PMV <img src={PMV} /></div>
        {pmv.map((device) =>
          <Link to={'/device/' + device.id}>
            <div className='PMVDevice' key={device.id}>
              <div className='DeviceTitle'>{device.name}</div>
              <PMVLiveData 
                id={device.id}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default List;