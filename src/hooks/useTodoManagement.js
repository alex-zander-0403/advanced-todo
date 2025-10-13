import { useEffect, useState } from "react";
import { useTodoActions } from "./useTodoActions";
import { useLocalStorage } from "./useLocalStorage";
import { useTodoApi } from "./useTodoApi";
import { useTodoHelpers } from "./useTodoHelpers";

//
export function useTodoManagement() {
  //
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

  const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();

  const {
    fetchTodosRequest,
    createTodoRequest,
    updateTodoRequest,
    deleteTodoRequest,
  } = useTodoApi();

  const { sortTodos, createNewTodo, updatedTodoData, toggleTodoCompletion } =
    useTodoHelpers();

  const actions = useTodoActions({
    todos,
    setTodos,
    saveToLocalStorage,
    createNewTodo,
    createTodoRequest,
    updatedTodoData,
    updateTodoRequest,
    toggleTodoCompletion,
    deleteTodoRequest,
    setIsDeletingCompleted,
  });

  // start
  useEffect(() => {
    const loadInitialData = async () => {
      const localTodos = loadFromLocalStorage();
      const sortedLocalTodos = sortTodos(localTodos);
      setTodos(sortedLocalTodos);

      try {
        const serverTodos = await fetchTodosRequest();
        const sortedServerTodos = sortTodos(serverTodos);

        setTodos(sortedServerTodos);
        saveToLocalStorage(sortedServerTodos);
      } catch (error) {
        console.error("Ошибка инициализации данных ->", error.message);
      }
    };

    loadInitialData();
  }, []);

  //
  return {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    ...actions,
  };
}
