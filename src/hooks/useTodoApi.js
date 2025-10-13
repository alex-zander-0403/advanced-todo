import { API_URL } from "../constants/todos";

//
export function useTodoApi() {
  //
  const fetchTodosRequest = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("-> Failed to fetch todos");

    return response.json();
  };

  //
  const createTodoRequest = async (newTodo) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) throw new Error("-> Failed to create todo");

    return response.json();
  };

  //
  const updateTodoRequest = async (id, todo) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) throw new Error("-> Failed to update todo");

    return response.json();
  };

  //
  const deleteTodoRequest = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("-> Failed to delete todo");
  };

  //
  return {
    fetchTodosRequest,
    createTodoRequest,
    updateTodoRequest,
    deleteTodoRequest,
  };
}
