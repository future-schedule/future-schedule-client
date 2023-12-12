import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext);
  return(
    <header>
      <nav className="navbar">
        <ul>
          {!isLoggedIn ?
            <>
              <li> <Link to="/signup">Sign Up</Link> </li>
              <li> <Link to="login">Login</Link> </li>
              <li>General</li>
            </>
           : 
           <>
              <li> <Link to="/events">Next Schedule</Link> </li>
              <li>Myself</li>
              <li> <Link onClick={logOutUser}>Logout</Link> </li>
           </>
          }
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;