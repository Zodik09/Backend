import React from 'react'
import Routers from './utils/Routers'
import './styles/app.css'
import axios from "axios";
axios.defaults.withCredentials = true;



const App = () => {
  return (
    <div className='main'>
      <Routers />
    </div>
  )
}

export default App