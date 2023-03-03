const URL = 'http://localhost:3030/pmv';

export const PMVService = {

  //Get Request
  getLiveData: async (id) => {
    try {
      const liveData = await fetch(`${URL}/${id}`);
      const response = await liveData.json();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      console.log(`Error in getLiveData service function : ${error}`);
    }
  },
}