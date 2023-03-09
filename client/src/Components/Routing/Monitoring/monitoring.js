import './monitoring.css';
import Charts from '../../Charts/charts';
/*
No Settings...

This is where I currently test out Charts to eventually show battery data charts of previous day.
*/



function Monitoring() {

  return (
    <div className='AppContainer'>
      <div className="Monitoring">
        <Charts
          id={22}
          battery={'lithium'}
          date={2}
          value={'voltage'}
        />
      </div>
    </div>
  );
}

export default Monitoring;