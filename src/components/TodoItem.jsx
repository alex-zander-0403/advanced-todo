import { useCallback, useEffect, useRef, useState } from "react";
import { DeleteIcon } from "./icons/DeleteIcon";
import { CheckboxButton } from "./CheckboxButton";
import { TodoEditForm } from "./TodoEditForm";
import { TodoInfo } from "./TodoInfo";
import { DeleteButton } from "./DeleteButton";
//
import { useSortable } from "@dnd-kit/sortable";
import { DragAndDropArea } from "./icons/DragAndDropArea";
import formatDateTime from "../helpers/dateUtils";

//
function TodoItem({ todo, onDelete, onToggleComplete, onUpdate }) {
  //
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");
  const editFormRef = useRef(null);

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    zIndex: isDragging ? 1 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group min-w-100 max-w-200 flex items-center justify-between gap-15 p-3 rounded-lg border-1 border-gray-300 dark:border-gray-700  bg-page-light dark:bg-page-dark shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-center items-center gap-3">
        {/* DragAndDropArea */}
        <div
          className="text-gray-800 dark:text-gray-500 cursor-grab active:cursor-grabbing"
          {...listeners}
        >
          <DragAndDropArea />
        </div>
        {/* done button */}
        <CheckboxButton
          isCompleted={todo.isCompleted}
          handleToggle={handleToggle}
        />
      </div>

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

      <div className="flex justify-center items-center gap-3">
        {/* create date & datedeadline */}
        <div className="flex flex-col items-center cursor-pointer">
          {todo.deadline && (
            <span
              className={`text-sm ${
                todo.isCompleted ? "text-green-800" : "text-red-700"
              }`}
            >
              сделать до: {formatDateTime(todo.deadline)}
            </span>
          )}
          {todo.createdAt && (
            <span
              className={`text-sm  ${
                todo.isCompleted ? "text-green-800" : "text-gray-500"
              }`}
            >
              создано: {formatDateTime(todo.createdAt)}
            </span>
          )}
        </div>

        {/* delete button */}
        <DeleteButton id={todo.id} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default TodoItem;
