import './charts.css';
import Spinner from '../../Spinner';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EMCService } from '../../Services/emcService';
import { PMVService } from '../../Services/pmvService';
import { useEffect, useState } from 'react';

/*
No Settings...

This is where I currently test out Charts to eventually show battery data charts of previous day.
*/



function Charts({ id, battery, date, value }) {

  const [ values, setValues ] = useState([]);
  const [ times, setTimes ] = useState([]);

  useEffect(() => {
    if (battery === 'pmv') {
      PMVService.getPastData(id, date, value)
      .then((response) => {
        setTimes(response.time);
        setValues(response.values);
      })
    } else {
      EMCService.getPastData(id, date, value)
      .then((response) => {
        setTimes(response.time);
        setValues(response.values);
      })
    }
  }, [id, date, battery, value]);

  return (
    <div>
      {values.length === 0 ? <LoadingData /> : <RenderChart />}
    </div>
  )


  function RenderChart () {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend, 
      Filler
    );

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  
    const data = {
      labels: times,
      datasets: [
        {
          label: 'Voltage',
          data: values,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1,
          fill: 'origin',
        },
      ],
    }
    return (
      <div className='AppContainer'>
        {console.log(data)}
        <div className="Charts">
          <Line 
            options={options} 
            data={data}
           />
        </div>
      </div>
    );
  }

  function LoadingData () {
    return (
      <div className='Charts'>
        <Spinner />
      </div>
    );
  }
}

export default Charts;