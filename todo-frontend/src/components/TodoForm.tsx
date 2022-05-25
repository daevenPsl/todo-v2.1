import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.scss";
import { Button, Form, TextInput, ToastNotification } from "@carbon/react";
import "./tmp.css"

export const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  const [toastNotification, toggleToastNotification] = useState(false);

  function handleTaskInputChange(e) {
    setTodo({ ...todo, task: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (todo.task.trim()) {
      console.log("add called");
      //add id before passing it to app.js using uuid
      addTodo({ ...todo, id: uuidv4() });

      toggleToastNotification(true);

      setTimeout(() => {
        toggleToastNotification(false);
        setTodo({ ...todo, task: "" });
      }, 3000)

      //setTodo({ ...todo, task: "" });
    }
  }


  return (
    <div className="App">
      <div className="centerContent">
        <h2>Todo</h2>
        
        <Form onSubmit={handleSubmit}>
          
          <TextInput
            // className="textInput"
            style={{ width: "500px", marginBottom: "10px" }}
            id="test2"
            invalidText="Invalid error message."
            labelText="Tasks"
            placeholder="Enter todo task"
            name="task"
            value={todo.task}
            onChange={handleTaskInputChange}
          />

          <Button
            style={{ paddingLeft: "55px" }}
            kind="primary"
            tabIndex={0}
            type="submit"
          >
            Add task
          </Button>
          
        </Form>
        
        {toastNotification && <ToastNotification
                        style={{position: "absolute", right: "20px", top: "60px"}}
                        title={'Success!'}
                        kind={'success'}
                        subtitle={'Added ' + todo.task+ ' to your todo list!'}
                        
                    />}
      </div>
      
    </div>
  );
};

// export default TodoForm;
