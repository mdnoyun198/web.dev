import React, { useEffect } from 'react'




const Navbar = ({ color }) => {
  // Case 1: Run on every render 
  useEffect(() => {
    alert("Hey I will run on every render")
  })




  // Case 2: Run only on first render 
  useEffect(() => {
    alert("This is the first render")
  }, [])




  // Case 3: Run only when certain values change
  useEffect(() => {
    alert("color was changed")
  }, [color])





  return (
    <div>
      I am navbar of {color} color hehe..
    </div>
  )
}

export default Navbar