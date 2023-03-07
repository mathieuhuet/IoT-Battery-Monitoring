import './settings.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

/*
No Settings...

This is where I currently test out Charts to eventually show battery data charts of previous day.
*/



function Settings() {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h'];


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Voltage',
        data: labels.map(() => faker.datatype.float({ min: 24.6, max: 27.8 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className='AppContainer'>
      <div className="Settings">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Settings;