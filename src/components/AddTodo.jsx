import { useState } from "react";

//
function AddTodo({ onAdd }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() !== "") {
      onAdd(value);
      setValue("");
    }
  }

  //
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-3 focus-within:ring-2 focus-within:ring-blue-800 bg-white rounded-lg shadow-sm overflow-hidden">
        <input
          type="text"
          value={value}
          placeholder="введите новую задачу"
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 p-3 outline-none text-gray-700 dark:text-txt-dark dark:bg-page-dark placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-3 cursor-pointer transition-colors duration-300 bg-blue-300 hover:bg-blue-200 text-white dark:bg-blue-900 dark:hover:bg-blue-800"
        >
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
            className="lucide lucide-plus-icon lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default AddTodo;
