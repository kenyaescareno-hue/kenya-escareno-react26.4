import { useEffect, useState } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList.jsx';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/tasks?page=0&limit=99', {
          credentials: 'include',
          headers: {
            'X-CSRF-TOKEN': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load todos.');
        }

        const data = await response.json();
        setTodoList(data.tasks || []);
      } catch (error) {
        setError('Unable to load your todos. Please try again.');
      } finally {
        setIsTodoListLoading(false);
      }
    };

    fetchTodos();
  }, [token]);

  const addTodo = async (todoTitle) => {
    const temporaryTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previousTodos) => [temporaryTodo, ...previousTodos]);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
	body: JSON.stringify({
		title: todoTitle,
		 isCompleted: false,
}),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo.');
      }

      const data = await response.json();

      setTodoList((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === temporaryTodo.id ? data.task || data : todo,
        ),
      );
    } catch (error) {
      setTodoList((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== temporaryTodo.id),
      );
      setError('Unable to add todo. Please try again.');
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    setTodoList((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete todo.');
      }
    } catch (error) {
      setTodoList((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === id ? originalTodo : todo,
        ),
      );
      setError('Unable to complete todo. Please try again.');
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id,
    );

    setTodoList((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo.');
      }
    } catch (error) {
      setTodoList((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo,
        ),
      );
      setError('Unable to update todo. Please try again.');
    }
  };

  return (
    <main>
      <h2>My Todos</h2>

      {error && (
        <div role="alert">
          <p>{error}</p>
          <button onClick={() => setError('')}>Dismiss</button>
        </div>
      )}

      {isTodoListLoading ? (
        <p>Loading todos...</p>
      ) : (
        <>
          <TodoForm onAddTodo={addTodo} />
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
          />
        </>
      )}
    </main>
  );
}

export default TodosPage;
