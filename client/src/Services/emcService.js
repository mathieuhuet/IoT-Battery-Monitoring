const API = process.env.REACT_APP_API_URL
? process.env.REACT_APP_API_URL + '/emc'
: 'http://localhost:3030/emc';


/*
Get Live data for EMC device.
&
Get past data for EMC device. (for the graph)
*/

export const EMCService = {

  getLiveData: async (id) => {
    if (!id) {
      return
    }
    try {
      const liveData = await fetch(`${API}/${id}`);
      const response = await liveData.json();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.log(`Error in getLiveData service function : ${error}`)
    }
  },

  getPastData: async (id, date, value) => {
    if (!id || !date || !value) {
      return {
        time: [],
        values: []
      }
    } else {
      try {
        const liveData = await fetch(`${API}/data/${id}/${date}`);
        const response = await liveData.json();
        if (response.error) {
          throw new Error(response.message);
        }
        const pastData = {
          time: [],
          values: []
        }
        for (let i = 0; i < response.data.length; i++) {
          pastData.time.push(new Date(response.data[i].createdAt).toLocaleDateString().slice(0, 5) + ' ' + new Date(response.data[i].createdAt).toLocaleTimeString().slice(0, 5));
          pastData.values.push(response.data[i][value]);
        }
        return pastData
      } catch (error) {
        console.log(`Error in getPastData service function : ${error}`)
        return {
          time: [],
          values: []
        }
      }
    }
  },
}