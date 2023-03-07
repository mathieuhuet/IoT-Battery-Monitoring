import './navbar.css';
import Top from './Top/top';
import Bottom from './Bottom/bottom';

/*
Navigation Bar on the left of the screen. 
It should always stay on screen.
*/


function Navbar({isAuthenticated}) {
  return (
    <div className="Navbar">
      <Top 
        isAuthenticated={isAuthenticated}
      />
      <Bottom 
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

export default Navbar