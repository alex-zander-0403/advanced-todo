import { useEffect, useState } from "react";
import { loadFromLocalStorage, saveToLocalStorage } from "../helpers/storage";
import {
  createNewTodo,
  sortTodos,
  toggleTodoCompletion,
  updatedTodoData,
} from "../helpers/todoHelpers";
import {
  createTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
} from "../api/todoApi";
import { useTodoActions } from "./useTodoActions";

//
export function useTodoManagement() {
  //
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

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
