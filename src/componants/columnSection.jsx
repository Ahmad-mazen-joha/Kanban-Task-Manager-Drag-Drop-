import React from "react";
import TaskComponant from "./taskComponant";
import { useDroppable } from "@dnd-kit/core";
import { ThemContex } from "../context.js";
export default function ColumnSection({
  priority,
  tasks,
  setIsTaskFormOpen,
  reduceTasksArr,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: priority, // e.g. "todo", "inprogress", "done"
  });
  let them = React.useContext(ThemContex);
  return (
    <section
      className={
        them.themMode ? "columnSection" + " " + them.themMode : "columnSection"
      }
      ref={setNodeRef}
      style={{
        background: isOver
          ? them.themMode === "lightMode"
            ? "#eee"
            : "gray"
          : undefined,
      }}
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
