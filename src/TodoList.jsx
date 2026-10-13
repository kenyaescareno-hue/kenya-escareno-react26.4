function TodoList() {
  const todoList = [
    { id: 1, title: 'make dinner' },
    { id: 2, title: 'do laundry' },
    { id: 3, title: 'feed fish' }
  ];

  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
