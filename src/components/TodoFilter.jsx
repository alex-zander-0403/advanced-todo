export function TodoFilter({ filter, setFilter }) {
  //
  const buttonStyle = (currentFilter) =>
    `px-2 rounded transition-color cursor-pointer ${filter === currentFilter ? "bg-blue-300 dark:bg-blue-800 dark:text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800"}`;

  //
  return (
    <div className="flex gap-3 mb-1 mt-5">
      <button onClick={() => setFilter("all")} className={buttonStyle("all")}>
        Все
      </button>

      <button
        onClick={() => setFilter("completed")}
        className={buttonStyle("completed")}
      >
        Выполненные
      </button>

      <button
        onClick={() => setFilter("notCompleted")}
        className={buttonStyle("notCompleted")}
      >
        Невыполненные
      </button>
    </div>
  );
}
