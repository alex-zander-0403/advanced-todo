//
export function sortTodos(todos) {
  const sortedTodos = [...todos].sort((a, b) => a.order - b.order);
  return sortedTodos;
}

//
export function createNewTodo(text, deadline, order) {
  return {
    id: Date.now(),
    text,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    deadline: deadline || null,
    order,
  };
}
