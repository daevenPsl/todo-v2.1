import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.scss";
import { Form, TextInput, TextArea, Select, SelectItem, Button, ToastNotification } from "@carbon/react";
import axios from "axios";
import { getTodoById, updateTodos } from "../services/service";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";


export const UpdatePage = () => {

  const location = useLocation();
  const {taskId, currentTask}=location.state as { taskId: string, currentTask: string }

  const [toastNotification, toggleToastNotification] = useState(false);

  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  useEffect(() => {

    getTodoById(taskId).then(res => {
      console.log("response is "+ res.data.task) 
      setTodo({...todo, task: res.data.task})
    });
   
  }, []);

  

  const handleTaskInputChange = (e) => {
    // const tmp=location.state as { taskId: string };
    // const tmp2 =location.state as { currentTask: string };
    

    //console.log("taskId "+tmp.taskId+ " currentTask "+tmp2.currentTask)
    console.log("taskId "+taskId+ " currentTask "+currentTask)
   // setTodo({ ...todo, id: updateId , task: e.target.value });
   setTodo({ ...todo, id: taskId , task: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.task.trim()) {
      console.log("updatepage called");
      //addTodo({...todo, id: uuidv4()});
      //setTodo({...todo, id:updateId});
      console.log("inside handlesubmit   " + todo.id + " " + todo.task);

    //   axios
    //     .put(`http://localhost:3001/todo/update/${updateId}?task=${todo.task}`)
    //     .then((res) => {
    //       console.log(res);
    //       //console.log(res.data);
    //     });

    //updateTodos(updateId, todo.task);

    updateTodos(taskId, todo.task);

    toggleToastNotification(true);

    setTimeout(() => toggleToastNotification(false), 5000)

      //toast("Updated todo to "+ todo.task);

      setTodo({ ...todo, task: "" });
    }
  };
  

  return (
    <div className="App">
      <div className="centerContent">
        <h2>Todo</h2>

        <Form onSubmit={handleSubmit}>
          <TextInput
            style={{ width: "500px", marginBottom: "10px" }}
            id="test2"
            invalidText="Invalid error message."
            labelText="Tasks"
            placeholder="Update todo task"
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
            Update task
          </Button>
        </Form>
        {toastNotification && <ToastNotification
                        style={{position: "absolute", right: "20px", top: "60px"}}
                        title={'Success!'}
                        kind={'success'}
                        subtitle={'Task updated!'}
                        
                    />}
      </div>
    </div>
  );
};

//export default UpdatePage;
