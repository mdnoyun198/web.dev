import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showbtn, setshowbtn] = useState(true)

  const [todos, setTodos] = useState([
    {
      title: "Hey",
      desc: "I am a good todo"
    },
    {
      title: "Hey Another todo",
      desc: "I am a good todo too"
    },
    {
      title: "Hey I am grocery todo",
      desc: "I am a good todo but I am grocery todo"
    },

  ])



















  // const Todo = () => {
  //   return (<>

  //     {/* <div className="todo">hello im todo</div> */}

  //     <div className="todo">{todo.title}</div>
  //     <div className="todo">{todo.desc}</div>

  //   </>)
  // }







  return (
    <>

      {/* <Todo /> */}





   {todos.map(todo => {
        return <Todo key={todo.title} todo={todo}/>
       
      })}














      <br></ br>
      {/* {showbtn?<button>I will Be show</button>:""} */}
      {/* {showbtn && <button>showbtn is clicked</button>} */}
      {showbtn ? <button>showbtn is true</button> : <button>showbtn is false</button>}

      <div className="card">



        <button onClick={() => setshowbtn(!showbtn)}>
          clicked{count}
        </button>

        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>

    </>
  )

}

export default App
