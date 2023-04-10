import './navbar.css';
import Top from './Top/top';
import Bottom from './Bottom/bottom';

/*
Navigation Bar on the left of the screen. 
It should always stay on screen.
*/


function Navbar() {
  return (
    <div className="Navbar">
      <Top />
      <Bottom />
    </div>
  );
}

export default Navbar