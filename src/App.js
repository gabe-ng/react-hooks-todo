import React, { useState } from 'react';
import './App.css';

const Todo = ({ todo, index }) => {
  return (
    <div classname="todo">
      { todo.text }
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
      className="input" 
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
  

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App;
