import React, { Suspense, useState } from "react";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import { DeleteCompletedButton } from "./components/DeleteCompletedButton";
import { Loader } from "./components/Loader";
import { NetworkNotification } from "./components/NetworkNotification";
import NetworkProvider from "./providers/NetworkProvider";

const MainContent = React.lazy(() => import("./components/MainContent"));

//
function App() {
  //
  const [theme, setTheme] = useState(getInitialTheme());

  const {
    todos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,

    onAdd,
    handleUpdate,
    onToggleComplete,
    handleDelete,
    hasCompletedTodos,
    handleDeleteAllCompleted,
    confirmDeleteCompleted,
    onReorder,
  } = useTodoManagement();

  // --------------------------------

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      <NetworkProvider>
        <NetworkNotification />
      </NetworkProvider>

      <ToggleTheme theme={theme} toggleTheme={() => toggleTheme(setTheme)} />

      {/*  */}
      <Suspense fallback={<Loader />}>
        <MainContent
          todos={todos}
          onAdd={onAdd}
          setDeletingId={setDeletingId}
          onToggleComplete={onToggleComplete}
          handleUpdate={handleUpdate}
          onReorder={onReorder}
        />
      </Suspense>

      {/*  */}

      <DeleteConfirmModal
        deletingId={deletingId}
        onCancel={() => setDeletingId(null)}
        onConfirm={() => {
          handleDelete(deletingId);
          setDeletingId(null);
        }}
        message={"Хотите удалить эту задачу?"}
      />

      <DeleteConfirmModal
        isDeletingCompleted={isDeletingCompleted}
        onCancel={() => setIsDeletingCompleted(false)}
        onConfirm={confirmDeleteCompleted}
        message={`Вы уверенны, что хотите удалить выполненные задачи? (${
          todos.filter((el) => el.isCompleted).length
        })`}
      />

      <DeleteCompletedButton
        hasCompletedTodos={hasCompletedTodos}
        handleDeleteAllCompleted={handleDeleteAllCompleted}
      />
    </div>
  );
}

export default App;
