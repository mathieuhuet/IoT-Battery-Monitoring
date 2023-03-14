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
  Filler,
  Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EMCService } from '../../Services/emcService';
import { PMVService } from '../../Services/pmvService';
import { useEffect, useState } from 'react';

/*
This is where I currently test out Charts to eventually show battery data charts of previous day.
*/



function MultiCharts({ id, name, battery, date, value }) {

  const [ graphDatasets, setGraphDatasets ] = useState([]);
  const [ times, setTimes ] = useState([]);

  useEffect(() => {
    let result = [];
    if (battery === 'pmv') {
      PMVService.getPastData(id[0], date, value)
      .then((response) => {
        setTimes(response.time);
      })
      for (let i = 0; i < id.length; i++) {
        PMVService.getPastData(id[i], date, value)
        .then((response) => {
          result.push({
            label: name[i],
            data: response.values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1,
            fill: 'origin',
          })
        })
      }
    } else {
      EMCService.getPastData(id[0], date, value)
      .then((response) => {
        setTimes(response.time);
      })
      for (let i = 0; i < id.length; i++) {
        EMCService.getPastData(id[i], date, value)
        .then((response) => {
          result.push({
            label: name[i],
            data: response.values,
            tension: 0.1,
            fill: 'origin',
          })
        })
      }
    }
    setGraphDatasets(result);
  }, [id, date, battery, value]);

  return (
    <div>
      {graphDatasets.length === 0 ? <LoadingData /> : <RenderChart />}
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
      Filler,
      Colors
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
          text: value.charAt(0).toUpperCase() + value.slice(1),
          font: {
            size: 20,
            weight: 'bold',
          },
          color: 'black',
        },
        colors: {
          enabled: true,
        },
      },
    };
  
    const data = {
      labels: times,
      datasets: graphDatasets,
    }
    return (
      <div className="Charts">
        {console.log(graphDatasets, 'MATHIEU')}
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

export default MultiCharts;