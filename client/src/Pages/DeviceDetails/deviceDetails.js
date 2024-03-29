import './deviceDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";
import { Radio, RadioGroup, FormLabel, FormControlLabel, FormControl, Slider, Button, Menu, MenuItem, Switch } from '@mui/material';
import { DeviceService } from '../../Services/deviceServiceApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { sortByName } from '../../Utilities/sortAlphabetically';
import EMCLiveData from '../../Components/LiveData/emcLiveData';
import PMVLiveData from '../../Components/LiveData/pmvLiveData';
import PMV from '../../Assets/pmvicon.png'
import MultiCharts from '../../Components/Charts/multiCharts';


  /*
  Single device details page.
  There's 3 tab. 
  Graph
  LiveData
  More

  Graph let you see a graph of past data of the device so you can monitor the performance.
  You can add other devices to the graph to compare the performance between them

  LiveData fetch the livedata of the device.

  More. you can update the values (ip port name ect) of the devices
  View who created the device and some live data
  You can also delete the device.
  */





function DeviceDetails() {
  const { prev, id } = useParams();
  const [ device, setDevice ] = useState([]);
  const [ devicePage, setDevicePage ] = useState('graph');
  let navigate = useNavigate();

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
      <ToastContainer />
      <div className='DeviceDetails'>
        <div className='DeviceDetailsTop'>
          <div className='GoBack' onClick={goBack}>
            <BsArrowLeftShort />
          </div>
          <div className='DeviceDetailsName' onClick={goGraph}>
            {device.name}
          </div>
          <div className='GoGraph Tab' onClick={goGraph}>
            Graph
          </div>
          <div className='GoLiveData Tab' onClick={goLiveData}>
            Live Data
          </div>
          <div className='GoMore Tab' onClick={goMore}>
            More
          </div>
        </div>
        <div className='DeviceDetailsBottom'>
          {devicePage === 'graph' ? <GraphDevice /> : devicePage === 'live' ? <LiveDataDevice /> : devicePage === 'more' ? <MoreInfoDevice /> : <GraphDevice />}
        </div>
      </div>
    </div>
  );



  function goBack () {
    if (prev === 'id') {
      navigate('/');
    } else if (prev === 'devices') {
      navigate('/devices');
    } else if (prev === 'monitoring') {
      navigate('/monitoring');
    }
  }

  function goGraph () {
    setDevicePage('graph')
  }

  function goLiveData () {
    setDevicePage('live')
  }

  function goMore () {
    setDevicePage('more')
  }





  function GraphDevice () {
    const [zero, setZero] = useState(true);
    const [ dataType, setDataType ] = useState('voltage');
    const handleChangeDataType = (event) => {
      const { value } = event.target;
      setDataType(value);
    };
  
    const [ dataTime, setDataTime ] = useState(1);
    const handleChangeDataTime = (event) => {
      const { value } = event.target;
      setDataTime(value);
    };

    const [deviceList, setDeviceList] = useState([]);
    const [graphedDevice, setGraphedDevice] = useState({ id: [device.id], name: [device.name]});

    useEffect(() => {
      DeviceService.getDevices()
      .then(data => {
        if (data) {
          let deviceArray = [];
          for (let i = 0; i < data.length; i++) {
            if (device.battery === 'pmv' && data[i].battery === 'pmv') {
              let bool = true;
              for (let j = 0; j < graphedDevice.id.length; j++) {
                if (graphedDevice.id[j] === data[i].id) {
                  bool = false;
                }
              }
              if (bool) {
                deviceArray.push(data[i]);
              }
            } else if (device.battery !== 'pmv' && data[i].battery !== 'pmv') {
              let bool = true;
              for (let j = 0; j < graphedDevice.id.length; j++) {
                if (graphedDevice.id[j] === data[i].id) {
                  bool = false;
                }
              }
              if (bool) {
                deviceArray.push(data[i]);
              }
            }
          }
          setDeviceList(sortByName(deviceArray));
        }
      })
    }, [graphedDevice.id]);
    return (
      <div className='GraphDeviceDetails'>
        <div className='GraphDeviceDetailsTop'>
          {device.battery === 'pmv' ? <DataTypePMV /> : <DataTypeEMC />}
          <div className='GraphDeviceDetailsDateSlider'>
            Show data from how many days ago
            <br />
            <Slider
              aria-label="Show data from how many days ago"
              value={dataTime}
              valueLabelDisplay="auto"
              step={1}
              onChange={handleChangeDataTime}
              marks
              min={1}
              max={7}
            />
          </div>
          {/* <div className='GraphDeviceDetailsetZero'>
            <FormControl component="fieldset">
              <FormControlLabel
                value={zero}
                control={<Switch color="primary" />}
                label="Hide 0's in graph?"
                labelPlacement="top"
                onChange={() => setZero(!zero)}
              />
            </FormControl>
          </div> */}
          <MenuAddDevice />
        </div>
        <MultiCharts 
          id={graphedDevice.id}
          name={graphedDevice.name}
          battery={device.battery}
          date={dataTime}
          value={dataType}
          zero={zero}
        />
      </div>
    )

    function MenuAddDevice () {
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      return (
        <div className='GraphAddDevice'>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <div className='GraphAddDeviceButton'>Add another {device.battery === 'pmv' ? 'PMV' : 'EMC'}</div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {deviceList.map((listedDevice) =>
              <MenuItem onClick={() => addDeviceToGraph(listedDevice.id, listedDevice.name)}>{listedDevice.name}</MenuItem>
            )}
          </Menu>
        </div>
      )
            
      function addDeviceToGraph (addedID, addedName) {
        if (graphedDevice.id.length >= 7) {
          //do nothing
        } else {
          setGraphedDevice({ id: graphedDevice.id.concat(addedID), name: graphedDevice.name.concat(addedName)})
        }
      }
    }

    function DataTypeEMC () {
      return (
        <div className='DeviceDetailsGraphDataType'>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Data Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={dataType}
              name="radio-buttons-group"
              onChange={handleChangeDataType}
            >
              <FormControlLabel value="voltage" control={<Radio />} label="Voltage" />
              <FormControlLabel value="temperature" control={<Radio />} label="Temperature" />
              <FormControlLabel value="load" control={<Radio />} label="Load" />
              <FormControlLabel value="charge" control={<Radio />} label="Charge" />
            </RadioGroup>
          </FormControl>
        </div>
      )
    }

    function DataTypePMV () {
      return (
        <div className='DeviceDetailsGraphDataType'>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Data Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={dataType}
              name="radio-buttons-group"
              onChange={handleChangeDataType}
            >
              <FormControlLabel value="voltage" control={<Radio />} label="Voltage" />
              <FormControlLabel value="photocell" control={<Radio />} label="Photocell" />
              <FormControlLabel value="message" control={<Radio />} label="Minutes" />
            </RadioGroup>
          </FormControl>
        </div>
      )
    }
  }



  

  function LiveDataDevice () {
    return (
      <div className='DeviceDetailsData'>
        {device.battery === 'pmv' ? <PMVLiveData id={device.id} /> : <EMCLiveData id={device.id} />}
      </div>
    )
  }






  function MoreInfoDevice () {
    return (
      <div className='DeviceMoreInfo'>
        <div className="DeviceDetailsLeft">
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
          <div className='DeleteDevice' onClick={deleteDeviceConfirm}>
            {device.battery === 'pmv' ? 'DELETE PMV' : 'DELETE EMC'}
          </div>
        </div>
      </div>
    )

    function deleteDeviceConfirm () {
      const options = {
        title: 'Are you sure you want to delete this device?',
        message: "You won't be able to recover it.",
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteDevice()
          },
          {
            label: 'No',
            onClick: () => undefined
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypress: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
      };
      
      confirmAlert(options);
    }

    async function deleteDevice () {
      await DeviceService.deleteDevice(device.id)
      if (prev === 'id') {
        navigate('/');
      } else if (prev === 'devices') {
        navigate('/devices');
      } else if (prev === 'monitoring') {
        navigate('/monitoring');
      }
    }

    function ModifyPMV () {

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
        const ip = stateUpdateForm.ip;
        const port = stateUpdateForm.port;
        const name = stateUpdateForm.name;
        let lat = stateUpdateForm.lat;
        let lng = stateUpdateForm.lng;
        const community = stateUpdateForm.community;
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
          notificationE('You must fill all the field to update a Device.');
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
          notificationE('ERROR WHILE UPDATING DEVICE. BACK_END PROBLEM');
          return;
        } else {
          notificationS('PMV Device Updated Successfully.');
          return;
        }
      }
  
      return (
        <div className="UpdatePMV">
        <br />
        <h3>Update PMV Device</h3>
        <br />
        <form className='UpdatePMVForm' onSubmit={updatePMV}>
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
        const ip = stateUpdateForm.ip;
        const port = stateUpdateForm.port;
        const name = stateUpdateForm.name;
        let lat = stateUpdateForm.lat;
        let lng = stateUpdateForm.lng;
        const community = stateUpdateForm.community;
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
          notificationE('You must fill all the field to update a Device.');
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
          notificationE('ERROR WHILE UPDATING DEVICE. BACK_END PROBLEM');
          return;
        } else {
          notificationS('EMC Device Updated Successfully.');
          return;
        }
      }
  
      return (
        <div className="UpdateEMC">
        <br />
        <h3>Update EMC Device</h3>
        <br />
        <form className='UpdateEMCForm' onSubmit={updateEMC}>
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




}

export default DeviceDetails;