import { useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import ToggleTheme from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import DeleteConfirmModal from "./components/ConfirmDeleteModal";
import { useTodoManagement } from "./hooks/useTodoManagement";

//
//
function App() {
  //
  // const [todos, setTodos] = useState([]);
  // const [theme, setTheme] = useState(getInitialTheme());
  // const [deletingId, setDeletingId] = useState(null);
  // const [isDeletingCompletedModal, setIsDeletingCompletedModal] =
  // useState(false);

  const {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompletedModal,
    setIsDeletingCompletedModal,

    onAdd,
    handleUpdate,
    onToggleComplete,
    handleDelete,
    hasCompletedTodos,
    handleDeleteAllCompleted,
    confirmDeleteCompleted,
  } = useTodoManagement();

  // -------------------

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
              onUpdate={handleUpdate}
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
          message={"Хотите удалить эту задачу?"}
        />
      )}

      {isDeletingCompletedModal && (
        <DeleteConfirmModal
          onCancel={() => setIsDeletingCompletedModal(false)}
          onConfirm={confirmDeleteCompleted}
          message={`Вы уверенны, что хотите удалить выполненные задачи? (${
            todos.filter((el) => el.isCompleted).length
          })`}
        />
      )}

      {hasCompletedTodos && (
        <button
          className="px-5 py-2 mt-5 text-white rounded transition-colors bg-red-700 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-500 cursor-pointer"
          onClick={handleDeleteAllCompleted}
        >
          Удалить все выполненные
        </button>
      )}
    </div>
  );
}

export default App;
