const API = process.env.REACT_APP_API_URL
? process.env.REACT_APP_API_URL + '/device'
: 'http://localhost:3030/device';

/*
Device Service, get general information for all the devices on the database.
NAME IP PORT ID ect.
*/

export const DeviceService = {

  //Get Request
  getDevices: async () => {
    try {
      const devices = await fetch(API);
      const response = await devices.json();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.log(`Error in getDevices service function : ${error}`);
    }
  },

  //Get Request
  getSingleDevice: async (id) => {
    try {
      const device = await fetch(`${API}/${id}`);
      const response = await device.json();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.log(`Error in getSingleDevice service function : ${error}`);
    }
  },

  //Post Request
  postDevice: async (data) => {
    try {
      const post = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });
      const response = await post.json();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.error(`ERROR AT postDevice in Services function: ${error}`);
    }
  },

  //PUT Request aka UPDATE
  updateDevice: async (id, updatedData) => {
    try {
      const put = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updatedData })
      });
      const response = await put.json();
      if (response.error) throw new Error(response.message);
      return response.data
    } catch (error) {
      console.error(`ERROR AT updateDevice in Services function: ${error}`);
    }
  },

  //DELETE Request
  deleteDevice: async (id) => {
    try {
      const del = await fetch(`${API}/${id}`, {
        method: 'DELETE'
      });
      const response = await del.json();
      if(response.error) throw new Error(response.message);
      return response.message; //because data is equal to null when we delete.
    } catch (error) {
      console.error(`ERROR AT deleteTopic in Services function: ${error}`);
    }
  }
}