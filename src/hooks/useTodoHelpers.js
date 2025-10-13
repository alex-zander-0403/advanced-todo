export function useTodoHelpers() {
  //
  const sortTodos = (todos) => {
    const sortedTodos = [...todos].sort((a, b) => a.order - b.order);
    return sortedTodos;
  };

  //
  const createNewTodo = (text, deadline, order) => {
    //
    return {
      id: Date.now(),
      text,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order,
    };
  };

  //
  const updatedTodoData = (todoToUpdate, newText, newDeadline) => {
    //
    return {
      ...todoToUpdate,
      text: newText,
      deadline: newDeadline,
    };
  };

  //
  const toggleTodoCompletion = (todo) => {
    //
    return {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
  };

  //
  return { sortTodos, createNewTodo, updatedTodoData, toggleTodoCompletion };
}
