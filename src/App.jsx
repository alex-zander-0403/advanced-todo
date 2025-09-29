import { useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import ToggleTheme from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";

//
// const initialTodos = [
//   { id: 1, text: "первая задача" },
//   { id: 2, text: "вторая задача" },
//   { id: 3, text: "третья задача" },
//   { id: 4, text: "четвертая задача" },
// ];

//
function App() {
  //
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme());

  // -------------------

  function onDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function onAdd(text, deadline) {
    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order: todos.length + 1,
    };

    setTodos([...todos, newTodo]);
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
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
