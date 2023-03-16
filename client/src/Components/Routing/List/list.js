import './list.css';
import { DeviceService } from '../../../Services/deviceServiceApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sortByName } from '../../../Utilities/sortAlphabetically';
import EMCLiveData from '../../LiveData/emcLiveData';
import PMVLiveData from '../../LiveData/pmvLiveData';
import PMV from '../../../Assets/pmvicon.png';

/*
List all the devices on screen and fetch the live data of all of them.
*/



function List () {

  const [pmv, setPMV] = useState([]);
  const [emc, setEMC] = useState([]);
  useEffect(() => {
    DeviceService.getDevices()
    .then(data => {
      if (data) {
        let pmvArray = [];
        let emcArray = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].battery === 'pmv') {
            pmvArray.push(data[i]);
          } else {
            emcArray.push(data[i])
          }
        }
        setEMC(sortByName(emcArray));
        setPMV(sortByName(pmvArray));
      }
    })
  }, []);


  return (
    <div className='AppContainer'>
      <div className="List">
        <div className='EMCListContainer'>
          <div className='EMCTitle'>EMC</div>
          <div className='EMCList'>
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
    </div>
  );
}

export default List;