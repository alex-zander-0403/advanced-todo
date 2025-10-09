import { useState } from "react";
import { DeadlineBlock } from "./DeadlineBlock";
import { PlusIcon } from "./icons/PlusIcon";

//
function AddTodo({ onAdd }) {
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);

  //
  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() !== "") {
      onAdd(value, deadline);
      setValue("");
      setDeadline("");
      setShowDeadlineInput(false);
    }
  }

  //
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-3 focus-within:ring-2 focus-within:ring-blue-800 rounded-lg shadow-sm overflow-hidden">
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
          <PlusIcon />
        </button>
      </div>

      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        setShowDeadlineInput={setShowDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
      />
    </form>
  );
}

export default AddTodo;
