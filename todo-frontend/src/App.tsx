import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.scss";
import { Home } from "./components/Home";
import { TodoForm } from "./components/TodoForm";
import { ViewTodo } from "./components/ViewTodo";
import { UpdatePage } from "./components/UpdatePage";
import { NavBar } from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { postTodo } from "./services/service";


function App() {
  const [todos, setTodos] = useState<
    { id: string; task: string; completed: boolean }[]
  >([]);

  //const [updateId, setUpdateId] = useState("");


  

  function addTodo(todo) {
    setTodos([...todos, todo]);

    // axios.post(`http://localhost:3001/todo`, { ...todo }).then((res) => {
    //   console.log(res.data);
    // });

    postTodo(todo);

  }


  return (
    <div className="App">
      <NavBar />

      <Router>
        <Routes>
          <Route path="/addtodo" element={<TodoForm addTodo={addTodo} />} />
          <Route path="/viewtodo" element={<ViewTodo  />} />
          <Route path="/" element={<ViewTodo  />} />
          <Route path="/updatepage" element={<UpdatePage/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
