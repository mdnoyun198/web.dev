
import mongoose from "mongoose";
import express from "express";
import { Todo } from "./models/todo.js";

let con = await mongoose.connect("mongodb://localhost:27017/todo");

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const newTodo = new Todo({
    title:1,
    desc: "description of todo",
    isDoin: false,
    days:6
  });

  newTodo.save();

  res.send('Hello World!');
});



// app.get('/a', async (req, res) => { 
//     let todo = await Todo.findOne({})
//     console.log(todo)
//     res.json({title: todo.title, desc: todo.desc})
// })




app.listen(port, () => {
  console.log("Example app listening on port");
});