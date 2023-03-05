import './addDevice.css';
import { DeviceService } from '../../../Services/deviceServiceApi';
import loginServiceJWT from '../../../Services/loginServiceJWT';
import PMV from '../../../Assets/pmvicon.png'


function AddDevice() {

  async function postEMC (event) {
    event.preventDefault();
    const ip = event.target.ip.value;
    const port = event.target.port.value;
    const name = event.target.name.value;
    let lat = event.target.lat.value;
    let lng = event.target.lng.value;
    const community = event.target.community.value;
    const battery = event.target.battery.value

    const testIP = event.target.ip.value.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    if (!testIP) {
      alert('The IP you entered is invalid (IP INVALID)');
      return;
    }
    if (lat.length < 4 || lng.length < 4) {
      alert('Latitude or Longitude is too short.');
      return;
    }
    if (lat.length >  18 || lng.length > 18) {
      alert('Latitude or Longitude is too long.');
      return;
    }
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) {
      alert('Latitude or Longitude must be a number.');
      return;
    }
    if (!ip || !port || !name || !lat || !lng || !battery || !community) {
      alert('You must fill all the field to add a Device.');
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
        alert('ERROR WHILE CREATING DEVICE. BACK_END PROBLEM');
        return;
      } else {
        alert('EMC Device Created Successfully.');
        return;
      }
    })


    event.target.ip.value = '';
    event.target.port.value = '';
    event.target.name.value = '';
    event.target.lat.value = '';
    event.target.lng.value = '';
    event.target.community.value = '';
  }

  async function postPMV (event) {
    event.preventDefault();
    const ip = event.target.ip.value;
    const port = event.target.port.value;
    const name = event.target.name.value;
    let lat = event.target.lat.value;
    let lng = event.target.lng.value;
    const community = event.target.community.value;
    const battery = 'pmv';

    const testIP = event.target.ip.value.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    if (!testIP) {
      alert('The IP you entered is invalid (IP INVALID)');
      return;
    }
    if (lat.length < 5 || lng.length < 5) {
      alert('Latitude or Longitude is too short.');
      return;
    }
    if (name.length > 26) {
      alert('Name of device too long (max: 26 characters)')
      return;
    }
    if (lat.length >  18 || lng.length > 18) {
      alert('Latitude or Longitude is too long.');
      return;
    }
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) {
      alert('Latitude or Longitude must be a number.');
      return;
    }
    if (!ip || !port || !name || !lat || !lng || !battery || !community) {
      alert('You must fill all the field to add a Device.');
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
        alert('ERROR WHILE CREATING DEVICE. BACK_END PROBLEM');
        return;
      } else {
        alert('PMV Device Created Successfully.');
        return;
      }
    })



    event.target.ip.value = '';
    event.target.port.value = '';
    event.target.name.value = '';
    event.target.lat.value = '';
    event.target.lng.value = '';
    event.target.community.value = '';
  }

  return (
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
            Name to identify EMC
            <br />
            <input
              name="name"
              type="text"
              placeholder="Name"
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
            />
          </label>
        </div>
        <div className='formBottomPMV'>
          <img src={PMV} />
        </div>
        <button type='submit' className='Submit-PMV' > Create new PMV </button>
      </form>
      </div>
    </div>
  );
}

export default AddDevice;
