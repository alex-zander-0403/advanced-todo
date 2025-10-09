export function DeleteCompletedButton({
  handleDeleteAllCompleted,
  hasCompletedTodos,
}) {
  //
  if (!hasCompletedTodos) return null;

  //
  return (
    <button
      className="px-5 py-2 mt-5 text-white rounded transition-colors bg-red-700 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-500 cursor-pointer"
      onClick={handleDeleteAllCompleted}
    >
      Удалить все выполненные
    </button>
  );
}
