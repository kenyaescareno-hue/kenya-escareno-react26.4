import './App.css';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState } from 'react';

const todos = [
  { id: 1, title: 'make dinner' },
  { id: 2, title: 'do laundry' },
  { id: 3, title: 'feed fish' }
];

function App() {
  const [todoList, setTodoList] = useState(todos);
  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
