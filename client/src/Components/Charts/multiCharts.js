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


  //Add every device passed in arguments to the graph
  useEffect(() => {
    let result = [];
    if (battery === 'pmv') {
      for (let i = 0; i < id.length; i++) {
        PMVService.getPastData(id[i], date, value)
        .then((response) => {
          setTimes(response.time);
          result.push({
            label: name[i],
            data: response.values,
            tension: 0.1,
            borderWidth: 3,
          })
        }).then(() => setGraphDatasets(result));
      }
    } else {
      for (let i = 0; i < id.length; i++) {
        EMCService.getPastData(id[i], date, value)
        .then((response) => {
          setTimes(response.time);
          result.push({
            label: name[i],
            data: response.values,
            tension: 0.1,
            borderWidth: 3,
          })
        }).then(() => setGraphDatasets(result));
      }
    }
  }, [battery, date, id, name, value]);

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