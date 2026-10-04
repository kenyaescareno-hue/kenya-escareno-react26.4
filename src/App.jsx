import './App.css'

function App() {
	const todoList = [
	{ id: 1, title: 'make dinner'},
	{ id: 2, title: 'do laundry'},
	{ id: 3, title: 'feed fish'}
	]
return (
  <div>
    <h1>Todo App</h1>
    <ul>
      {todoList.map(todo => (
	<li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  </div>
)
}

export default App
