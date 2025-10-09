import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Header from "./Header";

//
function MainContent({
  todos,
  onAdd,
  setDeletingId,
  onToggleComplete,
  handleUpdate,
}) {
  //
  return (
    <div className="mx-auto flex flex-col gap-3">
      <Header />
      <AddTodo onAdd={onAdd} />
      <TodoList
        todos={todos}
        setDeletingId={setDeletingId}
        onToggleComplete={onToggleComplete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default MainContent;
