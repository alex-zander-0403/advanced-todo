export function TodoInfo({ todo, setIsEditing }) {
  //
  return (
    <div
      className="flex items-center gap-5"
      onDoubleClick={() => setIsEditing(true)}
    >
      <div
        className={`${
          todo.isCompleted
            ? "line-through text-gray-500 dark:text-gray-500"
            : "text-gray-700 dark:text-gray-400"
        }`}
      >
        {todo.text}
      </div>
    </div>
  );
}
