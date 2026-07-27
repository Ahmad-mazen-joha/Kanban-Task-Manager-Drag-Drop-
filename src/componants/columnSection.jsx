import React from "react";
import TaskComponant from "./taskComponant";
import { useDroppable } from "@dnd-kit/core";
export default function ColumnSection({
  priority,
  tasks,
  setIsTaskFormOpen,
  reduceTasksArr,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: priority, // e.g. "todo", "inprogress", "done"
  });
  return (
    <section
      className="columnSection"
      ref={setNodeRef}
      style={{ background: isOver ? "#eee" : undefined }}
    >
      <h1 className="columnTitle">{priority}</h1>
      <div className="tasks">
        <ul>
          {tasks.map(
            (task) =>
              task && (
                <TaskComponant
                  title={task.title}
                  key={task.id}
                  column={priority}
                  setIsTaskFormOpen={setIsTaskFormOpen}
                  id={task.id}
                  reduceTasksArr={reduceTasksArr}
                />
              ),
          )}
        </ul>
      </div>
    </section>
  );
}
