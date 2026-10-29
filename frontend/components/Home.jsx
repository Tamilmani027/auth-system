import { Outlet, useNavigate } from 'react-router-dom';
import "../src/App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='homePage'>
      <h2>Welcome to Auth system</h2>
      <div className='homePageBtn'>
      <button onClick={() => navigate('/login')}>
      Login
      </button>
      <button onClick={() => navigate('/register')}>
      Register
      </button>
      </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Home;