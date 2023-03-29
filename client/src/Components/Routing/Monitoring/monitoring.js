import './monitoring.css';
import { Radio, RadioGroup, FormLabel, FormControlLabel, FormControl, Slider } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Charts from '../../Charts/charts';
import { sortByName } from '../../../Utilities/sortAlphabetically';
import { DeviceService } from '../../../Services/deviceServiceApi';

/*
All the devices are listed, each with a graph showing the performance of the device.
*/



function Monitoring() {

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

  const [ deviceType, setDeviceType ] = useState('emc');
  const handleChangeDeviceType = (event) => {
    const { value } = event.target;
    setDeviceType(value);
    setDataType('voltage');
  };

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

  return (
    <div className='AppContainer'>
      <div className="Monitoring">
        <div className='TopOptions'>
          <div className='GraphOptions'>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Device Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                value={deviceType}
                name="radio-buttons-group"
                onChange={handleChangeDeviceType}
              >
                <FormControlLabel value="emc" control={<Radio />} label="EMC" />
                <FormControlLabel value="pmv" control={<Radio />} label="PMV" />
              </RadioGroup>
            </FormControl>
          </div>
          {deviceType === 'emc' ? <DataTypeEMC /> : <DataTypePMV />}
          <div className='SliderOption'>
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
        </div>
        {deviceType === 'emc' ? <EMCMonitoring /> : <PMVMonitoring />}
      </div>
    </div>
  );


  
  
  function DataTypeEMC () {
    return (
      <div className='GraphOptions'>
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
      <div className='GraphOptions'>
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


  function EMCMonitoring () {
    return (
      <div className='GraphList'>
        {emc.map((device) => 
          <div key={device.id}>
          <Link to={'/device/monitoring/' + device.id}>
            <div className='ChartMonitoring' >
              <Charts
                id={device.id}
                battery={device.battery}
                date={dataTime}
                value={dataType}
                title={device.name}
              />
            </div>
          </Link>
          </div>
        )}
      </div>
    )
  }

  function PMVMonitoring () {
    return (
      <div className='GraphList'>
        {pmv.map((device) =>
          <div key={device.id}>
            <Link to={'/device/monitoring/' + device.id}>
              <div className='ChartMonitoring'>
                <Charts
                  id={device.id}
                  battery={device.battery}
                  date={dataTime}
                  value={dataType}
                  title={device.name}
                />
              </div>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default Monitoring;