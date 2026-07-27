import { useDraggable } from "@dnd-kit/core";
import { useContext } from "react";
import { ThemContex } from "../context.js";
export default function TaskComponant({
  title,
  id,
  column,
  setIsTaskFormOpen,
  reduceTasksArr,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id, // MUST be unique — this is how DndContext identifies WHICH task
  });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : { padding: "0px 10px" };
  let them = useContext(ThemContex);
  return (
    <>
      <li
        className={
          them.themMode + " " + (column === "Done" ? "task done" : "task")
        }
      >
        <span ref={setNodeRef} style={style} {...listeners} {...attributes}>
          ⠿ {title}
        </span>
        {column !== "Done" && (
          <div className="taskButtons">
            <div className="buttonWrapper">
              <button
                className="edit"
                onClick={() => {
                  setIsTaskFormOpen({ state: true, id: id });
                }}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => {
                  reduceTasksArr({ type: "delete", deletedTaskid: id });
                }}
              >
                Delete
              </button>
            </div>

            <input
              type="checkbox"
              defaultChecked={column === "Done" ? true : false}
              onChange={() => {
                reduceTasksArr({ type: "turnToDone", doneTaskId: id });
              }}
            />
          </div>
        )}
      </li>
    </>
  );
}
