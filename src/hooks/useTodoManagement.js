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
  const actions = useTodoActions({ todos, setTodos });

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

  // editing
  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = await updatedTodoData(
      todoToUpdate,
      newText,
      newDeadline
    );

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);

    try {
      await updateTodoRequest(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка редактирования todo ->", error.message);
      setTodos(todos);
    }
  };

  // toggle done-todo
  async function onToggleComplete(id) {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = toggleTodoCompletion(todoToUpdate);

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);

    try {
      await updateTodoRequest(id, updatedTodo);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка обновления ->", error.message);
      setTodos(todos);
    }
  }

  // deleting
  async function handleDelete(id) {
    const prevTodos = todos;
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);

    try {
      await deleteTodoRequest(id);
      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка удаления ->", error.message);
      setTodos(prevTodos);
    }
  }

  // reorder
  const onReorder = async (activeId, overId) => {
    if (!overId) return;

    try {
      const activeIndex = todos.findIndex((todo) => todo.id === activeId);
      const overIndex = todos.findIndex((todo) => todo.id === overId);

      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
        return;

      const newTodos = [...todos];
      const [movedTodo] = newTodos.splice(activeIndex, 1);
      newTodos.splice(overIndex, 0, movedTodo);

      const updatedTodos = newTodos.map((todo, index) => ({
        ...todo,
        order: index + 1,
      }));

      setTodos(updatedTodos);

      await Promise.all(
        updatedTodos.map((todo) =>
          updateTodoRequest(todo.id, { order: todo.order })
        )
      );

      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка перемещения ->", error.message);
      setTodos(todos);
    }
  };

  //
  // const hasCompletedTodos = todos.some((todo) => todo.isCompleted);
  function handleDeleteAllCompleted() {
    if (!todos.some((todo) => todo.isCompleted)) return;
    setIsDeletingCompleted(true);
  }

  async function confirmDeleteCompleted() {
    const prevTodos = todos;
    const completedIds = prevTodos
      .filter((todo) => todo.isCompleted)
      .map((todo) => todo.id);

    setTodos(prevTodos.filter((todo) => !todo.isCompleted));

    const failedId = [];

    for (const id of completedIds) {
      try {
        await deleteTodoRequest(id);
      } catch (error) {
        console.error(
          `Ошибка удаления одной из выполненных задач(${id}) ->`,
          error.message
        );
        failedId.push(id);
      }
    }

    if (failedId.length > 0) {
      setTodos(
        prevTodos.filter(
          (todo) => !todo.completed || failedId.includes(todo.id)
        )
      );
    }

    saveToLocalStorage(todos);
    setIsDeletingCompleted(false);
  }

  //
  return {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,

    // onAdd,
    handleUpdate,
    onToggleComplete,
    handleDelete,
    // hasCompletedTodos,
    handleDeleteAllCompleted,
    confirmDeleteCompleted,
    onReorder,
    actions,
  };
}
