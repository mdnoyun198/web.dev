// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Logo from './assets/react.svg';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
<Navbar/>


<img src={Logo} alt="" width={100} />





<Footer/>
    </>
  )
}

export default App
