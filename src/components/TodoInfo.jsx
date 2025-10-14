import formatDateTime from "../helpers/dateUtils";

//
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
      {/* <div className="flex flex-col items-center cursor-pointer">
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
      </div> */}
    </div>
  );
}
