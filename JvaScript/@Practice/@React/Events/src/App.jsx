import { useState } from 'react'
import './App.css'
import './index.css'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'



function App() {



  const handleClick = () => {

    alert("hello im clicked")

  }
  const handleonMouseOver = () => {

    // alert("hello im mouse over")

  }

  // const handleChange = (e) => {
  //   setName(e.target.value)
  // }


  // const [Name, setName] = useState("Rokey")


  const [form, setForm] = useState({/* name: "rokey", phone: "" */})




  const handleChange = (e) => {
    // setName(e.target.value)
    setForm({...form, [e.target.name]:e.target.value})
    console.log(form)
  }








  return (
    <>
      <div>

        <button onClick={handleClick}>Clicked</button>

        <div className="red cursor-pointer" onMouseOver={handleonMouseOver}>Hello im red div</div>


        <input className='bg-black' type="text" name='email' value={form.name} onChange={handleChange} />

        <input className='bg-black' type="text" name='phone' value={form.phone} onChange={handleChange} />

      <input type="text" name='phone' value={form.phone?form.phone:"" } onChange={handleChange} /> 
      </div>
    </>
  )
}

export default App
