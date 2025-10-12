import { LOCAL_STORAGE_KEY } from "../constants/todos";

//
export function loadFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

  return todos;
}

//
export function saveToLocalStorage(todos) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}
