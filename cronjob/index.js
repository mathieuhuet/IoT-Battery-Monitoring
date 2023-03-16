/*
File to run on cronjob every 10min to collect data for monitoring the batteries performance

Data collected here is use for the graphs on the app
*/



const Devices = require('./Models/device');
const getIndividualDeviceDatabase = require('./Models/individualDeviceData');
const fetch = require('node-fetch');



async function CollectAllData () {
  const devices =  await getAllDevices();
  let deviceModel = []
  for (let i = 0; i < devices.length; i++) {
    const model = getIndividualDeviceDatabase(devices[i].dataValues.id, devices[i].dataValues.battery)
    model.sync();
    deviceModel.push(model);
    if (devices[i].dataValues.battery === 'pmv') {
      const liveData = await getLiveDataPMV(devices[i].dataValues.id)
      await deviceModel[i].create(liveData)
    } else {
      const liveData = await getLiveDataEMC(devices[i].dataValues.id)
      await deviceModel[i].create(liveData)
    }
  }
}



//GET List of all devices
async function getAllDevices () {
  try {
    const devices = await Devices.findAll();
    return devices;
  } catch (error) {
    console.log('ERROR getAllDevices : '. error)
    return [];
  }
}

//GET live data for EMC device
async function  getLiveDataEMC (id) {
  try {
    const liveData = await fetch(`http://localhost:3030/emc/${id}`);
    const response = await liveData.json();
    if (response.error) {
      throw new Error(response.message);
    }
    return response.data;
  } catch (error) {
    console.log(`Error in getLiveData service function : ${error}`)
    return ({
      voltage: '0',
      temperature: '0',
      load: '0',
      charge: '0',
    })
  }
}

async function getLiveDataPMV (id) {
  try {
    const liveData = await fetch(`http://localhost:3030/pmv/${id}`);
    const response = await liveData.json();
    if (response.error) {
      throw new Error(response.message);
    }
    return response.data;
  } catch (error) {
    console.log(`Error in getLiveData service function : ${error}`);
    return ({
      voltage: '0',
      photocell: '0',
      message: '',
    })
  }
}

CollectAllData();

