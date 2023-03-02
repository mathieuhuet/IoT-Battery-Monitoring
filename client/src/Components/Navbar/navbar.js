import './navbar.css';
import Top from './Top/top';
import Bottom from './Bottom/bottom';


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