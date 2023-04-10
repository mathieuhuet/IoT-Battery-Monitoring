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
import { filterZero } from '../../Utilities/filterData';

/*
This is for single device charts. When navigating all the devices via the charts tab.
*/



function Charts({ id, battery, date, value, title, zero }) {

  const [ values, setValues ] = useState([]);
  const [ times, setTimes ] = useState([]);

  useEffect(() => {
    if (battery === 'pmv') {
      PMVService.getPastData(id, date, value)
      .then((response) => {
        if (zero) {
          setTimes(response.time);
          setValues(response.values);
        } else {
          const data = filterZero(response);
          setTimes(data.time);
          setValues(data.values);
        }
      })
    } else {
      EMCService.getPastData(id, date, value)
      .then((response) => {
        if (zero) {
          setTimes(response.time);
          setValues(response.values);
        } else {
          const data = filterZero(response);
          setTimes(data.time);
          setValues(data.values);
        }
      })
    }
  }, [id, date, battery, value, zero]);

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
      color: 'rgb(0, 0, 0)',
      scales: {
        x: {
          ticks: {
            color: "black"
          }
        },
        y: {
          ticks: {
            color: "black"
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 24,
            weight: 'bold',
          },
          color: 'black',
        },
      },
    };
  
    const data = {
      labels: times,
      datasets: [
        {
          label: value.charAt(0).toUpperCase() + value.slice(1),
          data: values,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1,
          fill: 'origin',
        },
      ],
    }
    return (
      <div className="Charts">
        <Line 
          options={options} 
          data={data}
          />
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