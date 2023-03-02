import './addDevice.css';


function AddDevice() {
  function testSubmit (event) {
    event.preventDefault(); //Prevent the page from being refreshed when form is submitted
    console.log(event.target.ip.value, " ", event.target.port.value, " ", event.target.device_type.value);
    const test = event.target.ip.value.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
    console.log(test, 'TEST')
    if (test) { //IF test === null // NO MATCH
      console.log(test[0], 'MATCHED IP');
    }
    if (!test) {
      console.log('IP ADDRESS IS NOT RECOGNIZE AS AN IPV4 ADDRESS');
    }
    if (!event.target.port.value) {
      console.log('NEED TO INPUT A PORT NUMBER')
    }
    if (!event.target.device_type.value) {
      console.log('NEED TO SPECIFY WHICH DEVICE TYPE')
    }
    event.target.ip.value = '';
    event.target.port.value = '';
    event.target.device_type.value = '';

  }
  return (
    <div className="AddDevice">
      <div className="AddEMC">
      <h3>Add a EMC Device</h3>
      <form className='AddEMC-Form' onSubmit={testSubmit}>
        <div className="formTop">
          <label>
            IP ADDRESS
            <br />
            <input
              name="ip"
              type="text"
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
            />
          </label>
        </div>
        <div className='formMiddle'>

        </div>
        <div className='formBottom'>
          <label>
            BATTERY TYPE
            <br />
            <input
              name="device_type" 
              type="radio"
              value="lithium"
              id="Lithium"
            />
            <label htmlFor="Lithium">Lithium</label>
            <br />
            <input
              name="device_type" 
              type="radio"
              value="agm"
              id="AGM"
            />
            <label htmlFor="AGM">AGM</label>
          </label>
          <br />
        </div>
        <button type='submit' className='Submit-EMC' > Create new EMC </button>
      </form>
      </div>
      <div className="AddPMV">
      <h3>Add a PMV Device</h3>
      <form className='AddPMV-Form' onSubmit={testSubmit}>
        <div className="formTop">
          <label>
            IP ADDRESS
            <br />
            <input
              name="ip"
              type="text"
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
            />
          </label>
        </div>
        <div className='formMiddle'>

        </div>
        <div className='formBottom'>

        </div>
        <button type='submit' className='Submit-PMV' > Create new PMV </button>
      </form>
      </div>
    </div>
  );
}

export default AddDevice;