import { useCallback, useEffect, useRef, useState } from "react";
import { DeleteIcon } from "./icons/DeleteIcon";
import { CheckboxButton } from "./CheckboxButton";
import { TodoEditForm } from "./TodoEditForm";
import { TodoInfo } from "./TodoInfo";
import { DeleteButton } from "./DeleteButton";

//
function TodoItem({ todo, onDelete, onToggleComplete, onUpdate }) {
  //
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");
  const editFormRef = useRef(null);

  //
  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  const handleSave = useCallback(() => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, editDeadline);
    }
    setIsEditing(false);
  }, [editText, editDeadline, todo.id, onUpdate]);

  const handleClickOutside = (e) => {
    if (editFormRef.current && !editFormRef.current.contains(e.target)) {
      handleSave();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
      // console.log("addEventListener добавлен");
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      // console.log("addEventListener удален");
    };
  }, [isEditing, handleSave]);

  //
  return (
    <div className="group min-w-100 max-w-200 flex items-center justify-between gap-15 p-3 rounded-lg bg-page-light dark:bg-page-dark shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* done button */}
      <CheckboxButton
        isCompleted={todo.isCompleted}
        handleToggle={handleToggle}
      />

      {/* main block - text + deadline*/}
      {isEditing ? (
        <TodoEditForm
          editText={editText}
          setEditText={setEditText}
          editDeadline={editDeadline}
          setEditDeadline={setEditDeadline}
          innerRef={editFormRef}
          handleSave={handleSave}
        />
      ) : (
        <TodoInfo todo={todo} setIsEditing={setIsEditing} />
      )}

      {/* delete button */}
      <DeleteButton id={todo.id} onDelete={onDelete} />
      {/*  */}
    </div>
  );
}

export default TodoItem;
