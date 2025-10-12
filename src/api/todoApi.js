import { API_URL } from "../constants/todos";

//
export async function fetchTodos() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("-> Failed to fetch todos");

  //
  return response.json();
}
