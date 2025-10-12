import { useEffect, useState } from "react";
import { API_URL } from "../constants/todos";
import { loadFromLocalStorage, saveToLocalStorage } from "../helpers/storage";
import { createNewTodo, sortTodos } from "../helpers/todoHelpers";
import { fetchTodos } from "../api/todoApi";

//
export function useTodoManagement() {
  //
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

  // start
  useEffect(() => {
    const loadInitialData = async () => {
      const localTodos = loadFromLocalStorage();
      const sortedLocalTodos = sortTodos(localTodos);
      setTodos(sortedLocalTodos);

      try {
        const response = await fetchTodos();

        if (response.ok) {
          const serverTodos = await response.json();
          const sortedServerTodos = sortTodos(serverTodos);
          setTodos(sortedServerTodos);

          saveToLocalStorage(sortedServerTodos);
        }
      } catch (error) {
        console.error("Ошибка инициализации данных ->", error.message);
      }
    };

    loadInitialData();
  }, []);

  // add
  async function onAdd(text, deadline) {
    
    const newTodo = createNewTodo(text, deadline, todos.length + 1);

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const createdTodo = await response.json();

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

  // editing
  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = {
      ...todoToUpdate,
      text: newText,
      deadline: newDeadline,
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

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

    const updatedTodo = {
      ...todoToUpdate,
      isCompleted: !todoToUpdate.isCompleted,
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

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
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

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
          fetch(`${API_URL}/${todo.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: todo.order }),
          })
        )
      );

      saveToLocalStorage(updatedTodos);
    } catch (error) {
      console.error("Ошибка перемещения ->", error.message);
      setTodos(todos);
    }
  };

  //
  const hasCompletedTodos = todos.some((todo) => todo.isCompleted);

  function handleDeleteAllCompleted() {
    if (!hasCompletedTodos) return;
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
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
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

    onAdd,
    handleUpdate,
    onToggleComplete,
    handleDelete,
    hasCompletedTodos,
    handleDeleteAllCompleted,
    confirmDeleteCompleted,
    onReorder,
  };
}
