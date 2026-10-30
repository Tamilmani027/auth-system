import { Outlet, useNavigate } from 'react-router-dom';
import "../src/App.css";
import { useContext, useState } from 'react';
import Context from '../src/Context';

function Home() {
  const navigate = useNavigate();
  const {isLoggedIn, login ,logout} = useContext(Context);
 
 const HandleLogout=()=>{
      logout()
      navigate('/')
 }
  

  return (
    <div>
      <div className='homePage'>
      {isLoggedIn ? (
          <div className="homePageBtn">
            <h3>Welcome back!</h3>

            <button onClick={() =>HandleLogout()}>Logout</button>
          </div>
        ) :
      ( <div className='homePageBtn'>
      <h2>Welcome to Auth system</h2>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
      </div>)}
      </div>

      <Outlet />
    </div>
  );
}

export default Home;