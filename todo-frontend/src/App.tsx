import React, { useState, useEffect } from "react";
import "./App.scss";
import { TodoForm } from "./components/TodoForm";
import { ViewTodo } from "./components/ViewTodo";
import { UpdatePage } from "./components/UpdatePage";
import { NavBar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { postTodo } from "./services/service";
import { useMutation } from 'react-query'

export const App =() => {
  const [todos, setTodos] = useState<
    { id: string; task: string; completed: boolean }[]
  >([]);

  const {mutate} = useMutation(postTodo)

  function addTodo(todo) {
    setTodos([...todos, todo]);

    // axios.post(`http://localhost:3001/todo`, { ...todo }).then((res) => {
    //   console.log(res.data);
    // });

    //const {isLoading, isError, error, mutate} = useMutation(postTodo(todo), {retry: 3})
    mutate(todo);
    //uncomment if removing useMutation and also uncomment fn in service.tx
    //postTodo(todo);

  }


  return (
    <div className="App">
      <NavBar />

      <Router>
        <Routes>
          <Route path="/addtodo" element={<TodoForm addTodo={addTodo} />} />
          <Route path="/viewtodo" element={<ViewTodo  />} />
          <Route path="/" element={<ViewTodo />} />
          <Route path="/updatepage" element={<UpdatePage/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
