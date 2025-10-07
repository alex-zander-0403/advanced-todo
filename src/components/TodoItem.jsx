import { useState } from "react";

//
function TodoItem({ todo, onDelete, onToggleComplete }) {
  //
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");

  //
  const handleSave = async () => {
    if (editText.trim()) {
      setIsEditing(false);
      // const updatedTodo = {
      //   ...todo,
      //   text: editText,
      // };

      // try {
      //   await fetch(`${API_URL}/${todo.id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedTodo),
      //   });

      //   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
      //   setIsEditing(false);
      // } catch (error) {
      //   console.error("Ошибка обновления текста ->", error.message);
      // }
    }
  };

  //
  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  //
  return (
    <div className="group min-w-100 max-w-200 flex items-center justify-between gap-15 p-3 rounded-lg bg-page-light dark:bg-page-dark shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-100">
      {/* done button */}
      <button
        onClick={handleToggle}
        className={`p-1 rounded-full border-2 ${
          todo.isCompleted
            ? "border-green-600 bg-green-300"
            : "border-gray-500 bg-gray-200"
        } transition-colors duration-300 cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 ${
            todo.isCompleted ? "text-black" : "text-transparent"
          }`}
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </button>

      {/* main block - text + deadline*/}
      {isEditing ? (
        <div className="flex flex-col w-full gap-2 items-stretch">
          <input
            className="w-full px-2 border-2 border-blue-500 rounded text-md bg-gray-400 text-gray-700"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />

          <div className="flex gap-2">
            <input
              className="w-full px-2 border-2 border-blue-500 rounded text-md bg-gray-400 text-gray-700"
              type="datetime-local"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />

            <button className="px-2 rounded bg-blue-500" onClick={handleSave}>Ok</button>

          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <div
            className={`${
              todo.isCompleted
                ? "line-through text-gray-500 dark:text-gray-500"
                : "text-gray-700 dark:text-gray-400"
            }`}
          >
            {todo.text}
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.deadline && (
              <span
                className={`text-sm ${
                  todo.isCompleted ? "text-green-800" : "text-red-700"
                }`}
              >
                сделать до:{" "}
                {new Date(todo.deadline).toLocaleString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            {todo.createdAt && (
              <span
                className={`text-sm  ${
                  todo.isCompleted ? "text-green-800" : "text-gray-500"
                }`}
              >
                создано:{" "}
                {new Date(todo.createdAt).toLocaleString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>
      )}

      {/* delete button */}
      <button onClick={() => onDelete(todo.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
      {/*  */}
    </div>
  );
}

export default TodoItem;
