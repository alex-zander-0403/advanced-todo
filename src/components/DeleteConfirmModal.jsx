export function DeleteConfirmModal({
  onCancel,
  onConfirm,
  message,
  deletingId,
  isDeletingCompleted,
}) {
  //
  const showModal = deletingId || isDeletingCompleted;

  if (!showModal) return null;

  //
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-black/50 z-10 backdrop-blur-xs"></div>

      <div className="relative z-11 flex h-full items-center justify-center">
        <div className="p-5 rounded-md shadow-xl max-w-md w-full bg-white text-gray-700 dark:bg-gray-800 dark:text-white">
          <h3 className="text-center text-xl font-bold mb-4">Удаление</h3>
          <p className="mb-6">{message}</p>

          <div className="flex justify-end gap-3">
            <button
              className="px-5 py-2 rounded transition-colors bg-gray-500 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-500 cursor-pointer"
              onClick={onCancel}
            >
              Отмена
            </button>
            <button
              className="px-5 py-2 rounded transition-colors bg-red-700 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-500 cursor-pointer"
              onClick={onConfirm}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

