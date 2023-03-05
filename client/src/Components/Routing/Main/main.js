import './main.css';
import Spinner from '../../../Spinner'
import Info from './Info/info'
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { DeviceService } from '../../../Services/deviceServiceApi';
import { EMCService } from '../../../Services/emcService';
import { PMVService } from '../../../Services/pmvService';
import EMCLiveData from '../../LiveData/emcLiveData';
import PMVLiveData from '../../LiveData/pmvLiveData';
import Battery0 from '../../../Assets/battery0.png'
import Battery1 from '../../../Assets/battery1.png'
import Battery2 from '../../../Assets/battery2.png'
import Battery3 from '../../../Assets/battery3.png'
import Battery4 from '../../../Assets/battery4.png'
import PMV from '../../../Assets/pmvicon.png'




function Main() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, //data for this information is hidden to protect my google account API KEY
  });
  const mapOptions = {
    fullscreenControl: false,
  };
  if (!isLoaded) {
    return <Spinner />
  }
  return <MapContainer />




  function MapContainer() {

    let navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    useEffect(() => {
      DeviceService.getDevices()
      .then(async data => {
        if (!data) {
  
        } else {
          async function run () {
            let result = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].battery === 'pmv') {
                const test = new Promise((resolve, reject) => {
                  PMVService.getLiveData(data[i].id)
                  .then(moredata => {
                    if (!moredata) {
                      data[i].icon = 0;
                      return resolve(data[i]);
                    } else {
                      data[i].voltage = moredata.voltage;
                      data[i].photocell = moredata.photocell;
                      data[i].message = moredata.message;
                      data[i].icon = 0;
                      return resolve(data[i]);
                    }
                  })
                })
                result.push(test);
              } else {
                const test = new Promise((resolve, reject) => {
                  EMCService.getLiveData(data[i].id)
                  .then(moredata => {
                    if (!moredata) {
                      data[i].icon = 'sad';
                      return resolve(data[i]);
                    } else {
                      data[i].voltage = moredata.voltage;
                      data[i].temperature = moredata.temperature;
                      data[i].load = moredata.load;
                      data[i].charge = moredata.charge;
                      if (moredata.voltage < 25) {
                        data[i].icon = 1;
            
                      } else if (moredata.voltage < 25.8) {
                        data[i].icon = 2;
            
                      } else if (moredata.voltage < 26.8) {
                        data[i].icon = 3;
            
                      } else {
                        data[i].icon = 4;
            
                      }
                      return resolve(data[i])
                    }
                  })
                })
                result.push(test);
              }
            }
            return result;
          }
          run().then((finaldata) => Promise.all(finaldata)).then((veryfinaldata) => setDevices(veryfinaldata))
        }
      })
    }, []);

        //DeviceInfo ([ID , BATTERYTYPE, NAME])
    const [deviceInfo, setDeviceInfo] = useState([0, '', '']);
    function DeviceInfo () {
      if (!deviceInfo[0]) {
        return
      } else {
        if (deviceInfo[1] === 'pmv') {
          return (
            <div className='DeviceInfo'>
              <div className='DeviceNameInfo'>
                {deviceInfo[2]}
              </div>
              <PMVLiveData
                id={deviceInfo[0]}
              />
              <div className='DeviceInfoButtons'>
                <div className='DeviceInfoButton' onClick={() => setDeviceInfo([0, '', ''])}>
                  Close
                </div>
                <div className='DeviceInfoButton' onClick={() => navigate(`/device/${deviceInfo[0]}`)}>
                  Modify
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className='DeviceInfo'>
              <div className='DeviceNameInfo'>
                {deviceInfo[2]}
              </div>
              <EMCLiveData
                id={deviceInfo[0]}
              />
              <div className='DeviceInfoButtons'>
                <div className='DeviceInfoButton' onClick={() => setDeviceInfo([0, '', ''])}>
                  Close
                </div>
                <div className='DeviceInfoButton' onClick={() => navigate(`/device/${deviceInfo[0]}`)}>
                  Modify
                </div>
              </div>
            </div>
          )
        }
      }
    }
    const center = useMemo(() => ({ lat: 45.57, lng: -73.48 }), []);
    return (
      <GoogleMap zoom={11} center={center} options={mapOptions} mapContainerClassName="MapContainer" >
        <Info />
        {devices.map((device) => 
          <div key={device.id}>
            <MarkerF 
              position={{lat: device.lat, lng: device.lng}} 
              // icon={() => getBatteryIcon(device.id)}
              icon={device.icon === 0 ? PMV : device.icon === 1 ? Battery1 : device.icon === 2 ? Battery2 : device.icon === 3 ? Battery3 : device.icon === 4 ? Battery4 : Battery0} 
              onClick={() => setDeviceInfo([device.id, device.battery, device.name])}
            />
          </div> 
        )}
        <DeviceInfo />
      </GoogleMap>
    )
  }
}

export default Main;