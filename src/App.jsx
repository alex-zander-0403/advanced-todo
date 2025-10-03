import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import ToggleTheme from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import DeleteConfirmModal from "./components/ConfirmDeleteModal";

//
const LOCAL_STORAGE_KEY = "todos";
const API_URL = "https://68671e3ae3fefb261eddbed3.mockapi.io/api/v1/todos";

//
//
function App() {
  //
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme());
  const [deletingId, setDeletingId] = useState(null);

  //
  useEffect(() => {
    const loadInitialData = async () => {
      const localStorageTodos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );

      setTodos(localStorageTodos);

      try {
        const response = await fetch(API_URL);

        if (response.ok) {
          const serverTodos = await response.json();
          setTodos(serverTodos);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverTodos));
        }
      } catch (error) {
        console.error("Ошибка инициализации данных ->", error.message);
      }
    };

    loadInitialData();
  }, []);

  // -------------------

  //
  async function onAdd(text, deadline) {
    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order: todos.length + 1,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const createdTodo = await response.json();

      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo
      );

      setTodos(syncedTodos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(syncedTodos));
    } catch (error) {
      console.error("Ошибка добавления ->", error.message);
      setTodos(todos);
    }
  }

  //
  async function onToggleComplete(id) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = {
      ...todoToUpdate,
      isCompleted: !todoToUpdate.isCompleted,
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Ошибка обновления ->", error.message);
      setTodos(todos);
    }
  }

  //
  async function handleDelete(id) {
    const prevTodos = todos;
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Ошибка удаления ->", error.message);
      setTodos(prevTodos);
    }
  }

  //
  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      <ToggleTheme theme={theme} toggleTheme={() => toggleTheme(setTheme)} />

      <div className="mx-auto flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Мои задачи
          </span>
        </h1>
        <AddTodo onAdd={onAdd} />
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => setDeletingId(todo.id)}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </div>

      {deletingId && (
        <DeleteConfirmModal
          onCancel={() => setDeletingId(null)}
          onConfirm={() => {
            handleDelete(deletingId);
            setDeletingId(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
