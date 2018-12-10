import React, { useState } from 'react';
import './App.css';

const Todo = ({ todo, index, completeTodo, removeTodo, updateTodo }) => {
  const [ updating, setUpdating ] = useState(false);
  const [ value, setValue ] = useState(todo.text);

  const handleSubmit = (index, value) => {
    setUpdating(false); 
    updateTodo(index, value)
  }
    return (
      updating ? 
        <div>
          <input 
            type="text"
            className="editInput"
            defaultValue={value}
            onChange={e => setValue(e.target.value)}
            />
            <button onClick={() => handleSubmit(index, value)}>Update</button>
            <button onClick={() => setUpdating(false)}>Cancel</button>
        </div> :
        <div style={{textDecoration: todo.isCompleted ? 'line-through' : ''}} className="todo">
          { todo.text }
          <div>
            <button onClick={() => completeTodo(index)}>Complete</button>
            <button onClick={() => removeTodo(index)}>X</button>
            <button onClick={() => setUpdating(true)}>Edit</button>
          </div>
        </div>
  )
}

const TodoForm = ({ addTodo }) => {
  const [ value, setValue ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      className="addInput" 
      value={value} 
      onChange={e => setValue(e.target.value)}
      placeholder="Add Todo..." />
    </form>
  )
}

const App = () => {
  const [ todos, setTodos ] = useState([
    {
      text: 'Learn about react',
      isCompleted: false,
    },
    {
      text: 'Meet friends for lunch',
      isCompleted: false,
    },
    {
      text: 'Build really cool todo app',
      isCompleted: false,
    },
  ]);

  const addTodo = text => {
    const newTodos = [ ...todos, { text }];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const updateTodo = (index, update) => {
    const newTodos = [ ...todos];
    newTodos[index].text = update;
    setTodos(newTodos);
  }
  

  return (
    <div className="app">
      <h1>React Todo with React Hooks</h1>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo 
            key={index} 
            index={index} 
            todo={todo} 
            completeTodo={completeTodo} 
            removeTodo={removeTodo}
            updateTodo={updateTodo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App;
