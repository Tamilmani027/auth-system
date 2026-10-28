import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Register from '../components/RegisterPage'

function App() {
  const [islogged, setislogged] = useState(false)

  return (
    <>
      <div>
        <h1>Home</h1>
        <button>Login</button>
        <button>Register</button>
        <Register/>
      </div>
    </>
  )
}

export default App
