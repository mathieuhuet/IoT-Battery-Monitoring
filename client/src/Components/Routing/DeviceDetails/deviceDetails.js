import './deviceDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import { DeviceService } from '../../../Services/deviceServiceApi';
import EMCLiveData from '../../LiveData/emcLiveData';
import PMVLiveData from '../../LiveData/pmvLiveData';
import PMV from '../../../Assets/pmvicon.png'


function DeviceDetails() {
  const { prev, id } = useParams();
  const [device, setDevice] = useState([]);
  let navigate = useNavigate();


  //Get DeviceInformation (name, ip, position)
  useEffect(() => {
    if (id) {
      DeviceService.getSingleDevice(id)
      .then(data => {
        setDevice(data);
      })
    }
  }, [id]);
  return (
    <div className='AppContainer'>
      <div className='DeviceDetails'>
        <div className="DeviceDetailsLeft">
          <div className='GoBack' onClick={goBack}>
            <BsArrowLeftShort />
          </div>
          <div className='ModifyDeviceDetails'>
            {device.battery === 'pmv' ? <ModifyPMV /> : <ModifyEMC />}
          </div>
        </div>
        <div className='DeviceDetailsRight'>
          <div className='DeviceDetailsInfo'>
            <div className='DeviceDetailsInfoTitle'>Created by</div>
            <div className='DeviceDetailsInfoData'>
              {device.createdBy}
            </div>
            <br />
            <div className='DeviceDetailsInfoTitle'>Created at</div>
            <div className='DeviceDetailsInfoData'>
              {new Date(device.createdAt).toLocaleDateString()}{' ' + new Date(device.createdAt).toLocaleTimeString()}
            </div>
            <br />
            <div className='DeviceDetailsInfoTitle'>Last Updated at</div>
            <div className='DeviceDetailsInfoData'>
              {new Date(device.updatedAt).toLocaleDateString()}{' ' + new Date(device.updatedAt).toLocaleTimeString()}
            </div>
          </div>
          <div className='DeviceDetailsData'>
            {device.battery === 'pmv' ? <PMVLiveData id={device.id} /> : <EMCLiveData id={device.id} />}
          </div>
          <div className='DeleteDevice' onClick={deleteDevice}>
            {device.battery === 'pmv' ? 'DELETE PMV' : 'DELETE EMC'}
          </div>
        </div>
      </div>
    </div>
  );

  function goBack () {
    if (prev === 'id') {
      navigate('/');
    } else if (prev === 'devices') {
      navigate('/devices');
    }
  }

  async function deleteDevice () {
    await DeviceService.deleteDevice(device.id)
    if (prev === 'id') {
      navigate('/');
    } else if (prev === 'devices') {
      navigate('/devices');
    }
  }

  function ModifyPMV () {

    const initialStateUpdateForm = {
      name: device.name,
      ip: device.ip,
      port: device.port,
      community: device.community,
      lat: device.lat,
      lng: device.lng,
    };

    const [stateUpdateForm, setStateUpdateForm] = useState(initialStateUpdateForm);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setStateUpdateForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    async function updatePMV (event) {
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
      const data = {
        ip: ip,
        port: port,
        lat: lat,
        lng: lng,
        name: name,
        battery: battery,
        community: community,
      }
      const updatedDevice = await DeviceService.updateDevice(device.id, data)
      if (!updatedDevice) {
        alert('ERROR WHILE UPDATING DEVICE. BACK_END PROBLEM');
        return;
      } else {
        alert('PMV Device Updated Successfully.');
        return;
      }
    }

    return (
      <div className="AddPMV">
      <br />
      <h3>Update PMV Device</h3>
      <br />
      <form className='AddPMVForm' onSubmit={updatePMV}>
        <div className="formTop">
          <label>
            Name to identify PMV
            <br />
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={stateUpdateForm.name}
              onChange={handleChange}
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
              value={stateUpdateForm.ip}
              onChange={handleChange}
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
              value={stateUpdateForm.port}
              onChange={handleChange}
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
              value={stateUpdateForm.community}
              onChange={handleChange}
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
              value={stateUpdateForm.lat}
              onChange={handleChange}
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
              value={stateUpdateForm.lng}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='formBottomPMV'>
          <img src={PMV} alt=''/>
        </div>
        <button type='submit' className='Submit-PMV' > Update PMV </button>
      </form>
      </div>
    );
  }

  function ModifyEMC () {

    const initialStateUpdateForm = {
      name: device.name,
      ip: device.ip,
      port: device.port,
      community: device.community,
      lat: device.lat,
      lng: device.lng,
    };

    const [stateUpdateForm, setStateUpdateForm] = useState(initialStateUpdateForm);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setStateUpdateForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };


    async function updateEMC (event) {
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
      const data = {
        ip: ip,
        port: port,
        lat: lat,
        lng: lng,
        name: name,
        battery: battery,
        community: community,
      }
    
      const updatedDevice = await DeviceService.updateDevice(device.id, data)
      if (!updatedDevice) {
        alert('ERROR WHILE UPDATING DEVICE. BACK_END PROBLEM');
        return;
      } else {
        alert('EMC Device Updated Successfully.');
        return;
      }
    }

    return (
      <div className="AddEMC">
      <br />
      <h3>Update EMC Device</h3>
      <br />
      <form className='AddEMCForm' onSubmit={updateEMC}>
        <div className="formTop">
          <label>
            Name to identify EMC
            <br />
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={stateUpdateForm.name}
              onChange={handleChange}
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
              value={stateUpdateForm.ip}
              onChange={handleChange}
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
              value={stateUpdateForm.port}
              onChange={handleChange}
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
              value={stateUpdateForm.community}
              onChange={handleChange}
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
              value={stateUpdateForm.lat}
              onChange={handleChange}
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
              value={stateUpdateForm.lng}
              onChange={handleChange}
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
        <button type='submit' className='Submit-EMC' > Update EMC </button>
      </form>
      </div>
    );
  }
}

export default DeviceDetails;