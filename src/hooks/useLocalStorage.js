import { LOCAL_STORAGE_KEY } from "../constants/todos";

//
export function useLocalStorage() {
  //
  const loadFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

    return todos;
  };

  //
  const saveToLocalStorage = (todos) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  };

  //
  return { loadFromLocalStorage, saveToLocalStorage };
}
