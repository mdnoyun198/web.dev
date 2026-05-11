import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";



function App() {

  const [cards, setCards] = useState([]);

  const fetchData = async () => {

    try {

      let a = await fetch("https://jsonplaceholder.typicode.com/posts");

      let data = await a.json();

      setCards(data);

      console.log("Fetched data:", data);

    } catch (error) {

      console.error("Error fetching data:", error);

    }

  };




  useEffect(() => {

    fetchData();

  }, []);




  return (





<div className="container flex flex-wrap gap-5 justify-center p-5">

<Navbar />




  {cards.length === 0 ? (
    <p>Loading...</p>
  ) : (
    cards.map((card) => (
      <div
        key={card.id}
        className="card border rounded-2xl shadow-lg p-5 w-80 bg-white hover:shadow-2xl transition-all"
      >
        <h1 className="text-lg font-bold text-gray-800 mb-2">
          {card.title}
        </h1>
        <p className="text-gray-600 text-sm mb-3">{card.body}</p>
        <span className="text-xs text-gray-500 italic">
          By: User {card.userId}
        </span>
      </div>
    ))
  )}
</div>




  );
}

export default App;







