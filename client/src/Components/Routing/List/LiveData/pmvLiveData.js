import './pmvLiveData.css';
import { PMVService } from '../../../../Services/pmvService';
import { useEffect, useState } from 'react';

function PMVLiveData({ id }) {
  const [pmvData, setPMVData] = useState([])
  useEffect(() => {
    PMVService.getLiveData(id)
    .then(data => {
      setPMVData(data);
    })
  }, [id]);
  return (
    <div className="pmvLiveData">
      {console.log(pmvData, 'LIVEDATA')}
    </div>
  );
}

export default PMVLiveData;