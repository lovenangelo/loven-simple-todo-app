import "./App.css";
import React, { useState, useEffect } from "react";

import {
  fetchTodos,
  addFinishedTodo,
  fetchFinishedTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "./lib/crud.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [finishedTodos, setFinishedTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTodoChange = (event) => {
    setNewTask(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleUpdateTaskChange = (event) => {
    setUpdateTask(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleDoneTodo = async (id, task, dateCreated) => {
    await addFinishedTodo(task, dateCreated);
    await deleteTodo(id);
    let resultFinishedTodo = await fetchFinishedTodos();
    let resultTodos = await fetchTodos();

    setFinishedTodos(resultFinishedTodo);
    setTodos(resultTodos);
  };

  const handleUpdateTodo = async (id, update) => {
    await updateTodo(id, update);
    let result = await fetchTodos();
    setTodos(result);
    setIsEditing(false);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    let result = await fetchTodos();
    setTodos(result);
  };

  const addTodoSubmitHandler = async (e) => {
    e.preventDefault();
    await addTodo(newTask);
    let result = await fetchTodos();
    setTodos(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetchTodos();
      setTodos(result);
      console.log(result);
    };
    const fetchFinishedTodosData = async () => {
      let result = await fetchFinishedTodos();
      setFinishedTodos(result);
      console.log(result);
    };
    fetchData();
    fetchFinishedTodosData();
  }, []);

  return (
    <div>
      <div className="App-header">
        <h1>Todo App</h1>
        <form onSubmit={addTodoSubmitHandler}>
          <label>
            Todo text here
            <input
              id="task"
              name="task"
              value={newTask}
              onChange={handleAddTodoChange}
              type="text"
            />
            <button type="submit">Add</button>
          </label>
        </form>
      </div>
      <div>
        <h1>TODOS</h1>
        {todos.length == 0 && <p>NO TASKS</p>}
        <ul>
          {todos.map((todo) => {
            return (
              <div className="todo">
                <h3>{"Date created: " + todo.dateCreated}</h3>
                <li>{todo.task}</li>{" "}
                <button onClick={() => setIsEditing(true)}>edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  delete
                </button>
                <button
                  onClick={() =>
                    handleDoneTodo(todo.id, todo.task, todo.dateCreated)
                  }
                >
                  done
                </button>
                {isEditing && (
                  <>
                    <input
                      id="updatetask"
                      name="updatetask"
                      value={updateTask}
                      onChange={handleUpdateTaskChange}
                      type="text"
                      placeholder="enter new value here"
                    />
                    <button
                      onClick={() => handleUpdateTodo(todo.id, updateTask)}
                    >
                      update
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h1>DONE</h1>
        {finishedTodos.length == 0 && <p>NO FINISHED TASKS</p>}
        <ul>
          {finishedTodos.map((todo) => {
            return (
              <div className="todo">
                <h3>{"Date finished: " + todo.dateFinished}</h3>
                <li>{todo.task}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
