import React, { useState, useEffect } from "react";
import "../App.scss";
import axios from "axios";
import { getTodos, toggleTodos, deleteTodos } from "../services/service";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
  TableContainer,
  Button,
  TableToolbar,
  DataTableToolbar,
  DataTableToolbarContent,
  DataTableToolbarAction,
  DataTableBatchActions,
  DataTableActionList,
  DataTableBatchAction,
  TableToolbarSearch

} from "@carbon/react";
import { useNavigate } from "react-router-dom";
import {useQuery, useMutation} from 'react-query'


export const ViewTodo = () => {

  const [todos, setTodos] = useState<{ id: string; task: string; completed: boolean }[]>([]);

  //change and uncomment useeffect
  const {data, error, isError, isLoading } = useQuery('todos', async() => {
    await getTodos().then(notes => setTodos(notes));
    console.log(data);
  }) 
  
  
  /*
  useEffect(() => {
    // axios.get(`http://localhost:3001/todo`).then((res) => {
    //   const notes = res.data;
    //   setTodos(notes);
    //   //console.log(notes);
    // });

    getTodos().then(notes => setTodos(notes));
   
  }, []);
*/



  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );

    
    // axios.put(`http://localhost:3001/todo/${id}`).then((res) => {
    //   console.log(res);
    //   //console.log(res.data);
    // });

      toggleTodos(id);
      
  }



  const headers = [
  
    {
      key: "task",
      header: "Task",
    },
  ];
  //header has not been added



  const deleteRow = (evt) => {
    const id = evt.target.value;
    // console.log("buttonCalled " + evt.target.value);
    setTodos(todos.filter((todo) => todo.id !== id));

    // axios.delete(`http://localhost:3001/todo/${id}`).then((res) => {
    //   console.log(res);
    //   //console.log(res.data);
    // });

    deleteTodos(id);
  }



   let navigate = useNavigate();

  const routeChange = (evt) => {
    const id = evt.target.value;
    console.log("route changed called with id " + id);
    //setUpdateId(id);
    navigate('/updatepage', {state:{taskId:id, currentTask:'sabaoon'} as{taskId:string, currentTask:string}})
    //navigate('/updatepage', {state:{id:1,name:'sabaoon'}})
    
  };

  const redirectToAddTodo= (evt)=>{
    navigate('/addtodo')
  }
  

  return (
    <div className="App">
      <div className="viewTodo">
        <h2 style={{ marginTop: "20px" }}>Todos</h2>
        
        

        <DataTable
          rows={todos}
          headers={headers}
          render={({
            rows,
            headers,
            getHeaderProps,
            getSelectionProps,
            selectAll,
            selectedRows,
            getTableProps
          }) => (
            <React.Fragment>
              <TableContainer>

                <TableToolbar>
                <Button
                    style={{ }}
                    kind="primary"
                    tabIndex={0}
                    type="submit"
                    onClick={redirectToAddTodo}
                  >
                    + Add task
                </Button>
                </TableToolbar>

                <Table {...getTableProps()}>

        {/* <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead> */}


                  <TableBody>                    
                    {rows.map((row) => (
                      <TableRow key={row.id}>       
                        <TableSelectRow
                          {...getSelectionProps({
                            row,
                            onClick: () => toggleComplete(row.id),
                          })}
                        />
                        {row.cells.map((cell) => {
                          //console.log(row);
                          // console.log(cell.value);
                          if (row.isSelected === true)
                            return (
                              <TableCell
                                style={{
                                  color: "black",
                                  textDecoration: cell.value
                                    ? "line-through"
                                    : null,
                                }}
                                key={cell.id}
                              >
                                {cell.value}
                              </TableCell>
                            );

                          return (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          );
                        })}

                        <Button onClick={deleteRow} value={row.id}>
                          Delete
                        </Button>
                        <Button onClick={routeChange} value={row.id}>
                          Update
                        </Button>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </React.Fragment>
          )}
        />
      </div>
    </div>
  );
};

// export default ViewTodo;
