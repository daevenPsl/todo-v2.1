//import React, { useState } from "react";
import axios from "axios";
import { apiBaseURL } from "../constants/constants";


const api = axios.create({
  baseURL: apiBaseURL
 });
 

// export const postTodo = (todo) => {
//   api.post(`/todo`, todo).then((res) => {
//     console.log(res.data);
//   });
// };

export const postTodo = (todo) => {
  return api.post(`/todo`, todo)
};


export const getTodos = () => {
  return api.get(`/todo`).then((res) => {
    const notes = res.data;
    return notes;
  });
};

/*
export const toggleTodos = (id) => {
  api.put(`/todo/${id}`).then((res) => {
    console.log(res);
    //console.log(res.data);
  });
};
*/

//reove return statement if reverting back to old
export const deleteTodos = (id) => {
  return api.delete(`/todo/${id}`).then((res) => {
    console.log(res);
  });
};


export const updateTodos = (updateId, task) => {

    // axios.put(`http://localhost:3001/todo/update/${updateId}?task=${task}`)
    //     .then((res) => {
    //       console.log(res);
    //       //console.log(res.data);
    //     });

    api.put(`/todo/update/${updateId}?task=${task}`)
        .then((res) => {
          console.log(res);
        });

  };


  export const getTodoById = (id) => {
    return api.get(`/todo/${id}`).then((res) => {
      return res;
    });
  };
  