import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function NavBar({ user }) {
  const navigate = useNavigate(); // Use useNavigate() instead of useHistory()

  return (
    <nav>
      <div className="nav-wrapper blue">
        <center><Link to="/" className="brand-logo">Todo</Link></center>
        <ul id="nav-mobile" className="right">
          {
            user ?
              <li>
                <button className="btn red" onClick={() => {
                  auth.signOut();
                  navigate('/login'); // Use navigate() instead of history.push()
                }}>logout</button>
              </li>
              :
              <>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
          }
        </ul>
      </div>
    </nav>
  );
}
