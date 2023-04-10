import './addDevice.css';
import { useState } from 'react';
import { DeviceService } from '../../Services/deviceServiceApi';
import loginServiceJWT from '../../Services/loginServiceJWT';
import PMV from '../../Assets/pmvicon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
Add Device Form. To add a EMC or PMV to the database.
*/


function AddDevice() {

  function notificationS (message) {
    toast.success(message, {
      position: "top-center",
      closeOnClick: true,
      theme: 'dark'
    });
  }

  function notificationE (message) {
    toast.error(message, {
      position: "top-center",
      closeOnClick: true,
      theme: 'dark'
    });
  }

  const initialStateEMC = {
    name: '',
    ip: '',
    port: '',
    community: '',
    lat: '',
    lng: '',
  };
  const [stateEMC, setStateEMC] = useState(initialStateEMC)
  const handleChangeEMC = (event) => {
    const { name, value } = event.target;
    setStateEMC((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const initialStatePMV = {
    name: '',
    ip: '',
    port: '',
    community: '',
    lat: '',
    lng: '',
  };
  const [statePMV, setStatePMV] = useState(initialStatePMV)
  const handleChangePMV = (event) => {
    const { name, value } = event.target;
    setStatePMV((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  async function postEMC (event) {
    event.preventDefault();
    const ip = stateEMC.ip;
    const port = stateEMC.port;
    const name = stateEMC.name;
    let lat = stateEMC.lat;
    let lng = stateEMC.lng;
    const community = stateEMC.community;
    const battery = event.target.battery.value

    const testIP = ip.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    if (!testIP) {
      notificationE('The IP you entered is invalid (IP INVALID)');
      return;
    }
    if (lat.length < 4 || lng.length < 4) {
      notificationE('Latitude or Longitude is too short.');
      return;
    }
    if (lat.length >  18 || lng.length > 18) {
      notificationE('Latitude or Longitude is too long.');
      return;
    }
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) {
      notificationE('Latitude or Longitude must be a number.');
      return;
    }
    if (!ip || !port || !name || !lat || !lng || !battery || !community) {
      notificationE('You must fill all the field to add a Device.');
      return;
    }
    //Get user info to add to CreatedBy attribute
    let user = '';
    const accessToken = localStorage.getItem('accessToken');
    const getProfile = async (accessToken) => {
      const userInfo = await loginServiceJWT.profile(accessToken);
      if (userInfo) {
        user = userInfo.firstName + ' ' + userInfo.lastName;
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile(accessToken).then(async () => {
      const data = {
        ip: ip,
        port: port,
        lat: lat,
        lng: lng,
        name: name,
        createdBy: user,
        battery: battery,
        community: community,
      }
  
      const newDevice = await DeviceService.postDevice(data)
      if (!newDevice) {
        notificationE('ERROR WHILE CREATING DEVICE. BACK_END PROBLEM');
        return;
      } else {
        notificationS('EMC Device successfully created');
        return;
      }
    })
    //Removing all the characters from the form field
    setStateEMC(initialStateEMC);
  }

  async function postPMV (event) {
    event.preventDefault();
    const ip = statePMV.ip;
    const port = statePMV.port;
    const name = statePMV.name;
    let lat = statePMV.lat;
    let lng = statePMV.lng;
    const community = statePMV.community;
    const battery = 'pmv';

    const testIP = ip.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    if (!testIP) {
      notificationE('The IP you entered is invalid (IP INVALID)');
      return;
    }
    if (lat.length < 5 || lng.length < 5) {
      notificationE('Latitude or Longitude is too short.');
      return;
    }
    if (name.length > 26) {
      notificationE('Name of device too long (max: 26 characters)')
      return;
    }
    if (lat.length >  18 || lng.length > 18) {
      notificationE('Latitude or Longitude is too long.');
      return;
    }
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) {
      notificationE('Latitude or Longitude must be a number.');
      return;
    }
    if (!ip || !port || !name || !lat || !lng || !battery || !community) {
      notificationE('You must fill all the field to add a Device.');
      return;
    }
    //Get user info to add to CreatedBy attribute
    let user = '';
    const accessToken = localStorage.getItem('accessToken');
    const getProfile = async (accessToken) => {
      const userInfo = await loginServiceJWT.profile(accessToken);
      if (userInfo) {
        user = userInfo.firstName + ' ' + userInfo.lastName;
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile(accessToken).then(async () => {
      const data = {
        ip: ip,
        port: port,
        lat: lat,
        lng: lng,
        name: name,
        createdBy: user,
        battery: battery,
        community: community,
      }
  
      const newDevice = await DeviceService.postDevice(data)
      if (!newDevice) {
        notificationE('ERROR WHILE CREATING DEVICE. BACK_END PROBLEM');
        return;
      } else {
        notificationS('PMV Device Created Successfully.');
        return;
      }
    })
    //Removing all the characters from the form field
    setStatePMV(initialStatePMV);
  }

  return (

    <div className='AppContainer'>
      <ToastContainer />
      <div className="AddDevice">
        <div className="AddEMC">
        <br />
        <h3>Add a EMC Device</h3>
        <br />
        <form className='AddEMCForm' onSubmit={postEMC}>
          <div className="formTop">
            <label>
              Name to identify EMC
              <br />
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={stateEMC.name}
                onChange={handleChangeEMC}
              />
            </label>
            <br />
            <label>
              IP ADDRESS
              <br />
              <input
                name="ip"
                type="text"
                placeholder="IP Address"
                value={stateEMC.ip}
                onChange={handleChangeEMC}
              />
            </label>
            <br />
            <label>
              PORT
              <br />
              <input
                name="port"
                type="number"
                min="1"
                max="65555"
                placeholder='#PORT'
                value={stateEMC.port}
                onChange={handleChangeEMC}
              />
            </label>
            <br />
            <label>
              COMMUNITY STRING
              <br />
              <input
                name="community"
                type="text"
                placeholder='Community String'
                value={stateEMC.community}
                onChange={handleChangeEMC}
              />
            </label>
          </div>
          <div className='formMiddle'>
            <label>
              LATITUDE
              <br />
              <input
                name="lat"
                type="text"
                placeholder="Latitude (ex. -75.23452)"
                value={stateEMC.lat}
                onChange={handleChangeEMC}
              />
            </label>
            <br />  
            <label>
              LONGITUDE
              <br />
              <input
                name="lng"
                type="text"
                placeholder='Longitude (ex. 42.02358)'
                value={stateEMC.lng}
                onChange={handleChangeEMC}
              />
            </label>
          </div>
          <div className='formBottom'>
            <label>
              BATTERY TYPE
              <br />
              <div className='Radio'>
                <input
                  name="battery" 
                  type="radio"
                  value="lithium"
                  id="Lithium"
                />
                <label htmlFor="Lithium">Lithium</label>
              </div>
              <div className='Radio'>
                <input
                  name="battery" 
                  type="radio"
                  value="agm"
                  id="AGM"
                />
                <label htmlFor="AGM">AGM</label>
              </div>
            </label>
            <br />
          </div>
          <button type='submit' className='Submit-EMC' > Create new EMC </button>
        </form>
        </div>
        <div className="AddPMV">
        <br />
        <h3>Add a PMV Device</h3>
        <br />
        <form className='AddPMVForm' onSubmit={postPMV}>
          <div className="formTop">
            <label>
              Name to identify PMV
              <br />
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={statePMV.name}
                onChange={handleChangePMV}
              />
            </label>
            <br />
            <label>
              IP ADDRESS
              <br />
              <input
                name="ip"
                type="text"
                placeholder="IP Address"
                value={statePMV.ip}
                onChange={handleChangePMV}
              />
            </label>
            <br />
            <label>
              PORT
              <br />
              <input
                name="port"
                type="number"
                min="1"
                max="65555"
                placeholder='#PORT'
                value={statePMV.port}
                onChange={handleChangePMV}
              />
            </label>
            <br />
            <label>
              COMMUNITY STRING
              <br />
              <input
                name="community"
                type="text"
                placeholder='Community String'
                value={statePMV.community}
                onChange={handleChangePMV}
              />
            </label>
          </div>
          <div className='formMiddle'>
            <label>
              LATITUDE
              <br />
              <input
                name="lat"
                type="text"
                placeholder="Latitude (ex. -75.23452)"
                value={statePMV.lat}
                onChange={handleChangePMV}
              />
            </label>
            <br />  
            <label>
              LONGITUDE
              <br />
              <input
                name="lng"
                type="text"
                placeholder='Longitude (ex. 42.02358)'
                value={statePMV.lng}
                onChange={handleChangePMV}
              />
            </label>
          </div>
          <div className='formBottomPMV'>
            <img src={PMV} alt=''/>
          </div>
          <button type='submit' className='Submit-PMV' > Create new PMV </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default AddDevice;
