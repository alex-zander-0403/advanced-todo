export function TodoEditForm({
  editText,
  setEditText,
  editDeadline,
  setEditDeadline,
  innerRef,
  handleSave,
}) {
  //

  //
  return (
    <div className="flex flex-col w-full gap-2 items-stretch" ref={innerRef}>
      <input
        className="w-full px-2 border-2 border-blue-500 rounded text-md bg-gray-400 text-gray-700"
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
      />

      <div className="flex gap-2">
        <input
          className="w-full px-2 border-2 border-blue-500 rounded text-md bg-gray-400 text-gray-700"
          type="datetime-local"
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          // onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />

        <button className="px-2 rounded bg-blue-500" onClick={handleSave}>
          Ok
        </button>
      </div>
    </div>
  );
}
