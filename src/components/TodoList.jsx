import TodoItem from "./TodoItem";

//
function TodoList({ todos, setDeletingId, onToggleComplete, handleUpdate }) {
  //

  //
  return (
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
  );
}

//
export default TodoList;
