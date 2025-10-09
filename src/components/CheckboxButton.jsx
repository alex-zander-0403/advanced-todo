export function CheckboxButton({ isCompleted, handleToggle }) {
  //
  return (
    //
    <button
      onClick={handleToggle}
      className={`p-1 rounded-full border-2 ${
        isCompleted
          ? "border-green-600 bg-green-300"
          : "border-gray-500 bg-gray-200"
      } transition-colors duration-300 cursor-pointer`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 ${isCompleted ? "text-black" : "text-transparent"}`}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </button>
  );
}
