export function DeadlineBlock({
  showDeadlineInput,
  setShowDeadlineInput,
  deadline,
  setDeadline,
}) {
  //

  //
  return (
    <>
      {showDeadlineInput && (
        <div className="flex items-center justify-between mb-3 focus-within:ring-2 focus-within:ring-blue-800 rounded-lg shadow-sm overflow-hidden">
          <input
            className="flex-1 p-3 outline-none text-gray-700 dark:text-txt-dark dark:bg-page-dark placeholder-gray-400"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button
            className="p-3 cursor-pointer transition-colors duration-300 bg-blue-300 hover:bg-blue-200 text-white dark:bg-blue-900 dark:hover:bg-blue-800"
            type="button"
            onClick={() => {
              setDeadline("");
              setShowDeadlineInput(false);
            }}
          >
            Отмена
          </button>
        </div>
      )}

      {!showDeadlineInput && (
        <button
          className="self-start p-3 cursor-pointer transition-colors duration-300 text-red-800 dark:text-red-700 hover:text-red-500"
          type="button"
          onClick={() => {
            setShowDeadlineInput(true);
          }}
        >
          Добавить дедлайн +
        </button>
      )}
    </>
  );
}
