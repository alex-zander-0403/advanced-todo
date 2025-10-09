import { DeleteIcon } from "./icons/DeleteIcon";

//
export function DeleteButton({ id, onDelete }) {
  //
  return (
    <button onClick={() => onDelete(id)}>
      <DeleteIcon />
    </button>
  );
}
