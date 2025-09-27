function ToggleTheme({ theme, toggleTheme }) {
  //

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <button onClick={toggleTheme} className="relative  cursor-pointer">
          <div className="w-14 h-7 rounded-full shadow-inner transition-colors duration-300 bg-gray-300 dark:bg-zinc-700"></div>
          <div className="absolute top-0.5 left-0.5 h-6 w-6 bg-white rounded-full shadow-md transform transition-transform duration-300 translate-x-0 dark:translate-x-7"></div>
        </button>
      </div>
    </div>
  );
}

export default ToggleTheme;
