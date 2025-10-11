import TodoItem from "./TodoItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

//
export function TodoList({
  todos,
  setDeletingId,
  onToggleComplete,
  handleUpdate,
  onReorder,
}) {
  //

  const handleDragEnd = (e) => {
    // if (e.active.id === e.over.id) return;
    if (!e.over || e.active.id !== e.over.id) {
      onReorder(e.active.id, e.over?.id);
    }
  };

  //
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={todos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => setDeletingId(todo.id)}
              onToggleComplete={onToggleComplete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
