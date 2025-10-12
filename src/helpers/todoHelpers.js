//
export function sortTodos(todos) {
  const sortedTodos = [...todos].sort((a, b) => a.order - b.order);
  return sortedTodos;
}
