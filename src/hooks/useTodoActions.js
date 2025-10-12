import { createTodoRequest } from "../api/todoApi";
import { saveToLocalStorage } from "../helpers/storage";
import { createNewTodo } from "../helpers/todoHelpers";

//
export function useTodoActions({ todos, setTodos }) {
  //

  // add
  async function onAdd(text, deadline) {
    const newTodo = createNewTodo(text, deadline, todos.length + 1);

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    try {
      const createdTodo = await createTodoRequest(newTodo);

      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo
      );

      setTodos(syncedTodos);
      saveToLocalStorage(syncedTodos);
    } catch (error) {
      console.error("Ошибка добавления ->", error.message);
      setTodos(todos);
    }
  }

  return { onAdd };
}
