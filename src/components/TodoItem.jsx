import { useState } from "react";

//
function TodoItem({ todo, onDelete }) {
  //
  const [isCompleted, setIsCompleted] = useState(false);

  //
  return (
    <div className="group flex items-center justify-between gap-15 p-3 rounded-lg bg-page-light dark:bg-page-dark shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-100">
      <div className="flex items-center gap-15">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`p-1 rounded-full border-2 ${
            isCompleted
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
              isCompleted ? "text-black" : "text-transparent"
            }`}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </button>
        <div
          className={`${
            isCompleted
              ? "line-through text-gray-500 dark:text-gray-500"
              : "text-gray-700 dark:text-gray-400"
          }`}
        >
          {todo.text}
        </div>
      </div>

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
    </div>
  );
}

export default TodoItem;
