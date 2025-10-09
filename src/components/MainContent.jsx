import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Header from "./Header";
import { TodoFilter } from "./TodoFilter";
import { useState } from "react";

//
function MainContent({
  todos,
  onAdd,
  setDeletingId,
  onToggleComplete,
  handleUpdate,
}) {
  //
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "notCompleted") return !todo.isCompleted;
    return true;
  });

  //
  return (
    <div className="mx-auto flex flex-col gap-3">
      <Header />
      <AddTodo onAdd={onAdd} />

      <TodoFilter filter={filter} setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        setDeletingId={setDeletingId}
        onToggleComplete={onToggleComplete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default MainContent;
