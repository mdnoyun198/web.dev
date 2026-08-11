'use client'

import { useState, useEffect } from "react"

function page() {


  const [text, setText] = useState(null)



  async function hendeler() {

    const res = await fetch('/api/add', {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },



    })

    let data = await res.json()

    setText(data.hello)

  }

  useEffect(() => { hendeler() }, [])




  return (
    <div>


      <h1>{text}</h1>


    </div>
  )
}

export default page
