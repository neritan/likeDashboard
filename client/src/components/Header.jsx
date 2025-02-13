/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import "./styles/Header.css";

function Header({allLikes}) {
    return (
      <div className="header-container">
        <nav className="nav">
          <div className="nav-left">
            <img src="/src/assets/betaplan.png" alt="Betaplan Logo" width={'50px'} />
            <Link to="/" className="brand">
              BPlan Likes : {allLikes ? allLikes.length : 0}
            </Link>
          </div>
          <div className="nav-right">
            <div className="nav-links">
              
            </div>
          </div>
        </nav>
      </div>
    );
}
  
export default Header;