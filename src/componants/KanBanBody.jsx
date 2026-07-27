import React from "react";
import ColumnSection from "./columnSection";
import { DndContext } from "@dnd-kit/core";
export default function KanbanBody({ arrayOfColumns }) {
  const [tasksArr, reduceTasksArr] = React.useReducer(changeTasksArr, [
    { id: 1, title: "make a potato", column: "To Do", done: false },
    {
      id: 2,
      title: "make a potato prograss",
      column: "In Progress",
      done: false,
    },
    { id: 3, title: "make a tato", column: "To Do", done: false },
    { id: 4, title: "make a potato done", column: "Done", done: true },
    { id: 5, title: "make a potato", column: "To Do", done: false },
    { id: 6, title: "make a potato done", column: "Done", done: false },
  ]);
  const [isTaskFormOpen, setIsTaskFormOpen] = React.useState({
    state: false,
    id: null,
  });

  let generateId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  let addNewTask = (formData) => {
    console.log(isTaskFormOpen.id);
    if (isTaskFormOpen.id) {
      console.log("editing task");
      let taskContent = formData.get("taskContent");
      reduceTasksArr({
        type: "edit",
        editedTask: {
          id: isTaskFormOpen.id,
          title: taskContent,
          column: tasksArr.find((task) => task.id === isTaskFormOpen.id).column,
          done: false,
        },
      });
      setIsTaskFormOpen({ state: false, id: null });
    } else {
      let taskContent = formData.get("taskContent");
      let taskColumn = formData.get("columnOption");

      reduceTasksArr({
        type: "add",
        newTask: {
          id: generateId(),
          title: taskContent,
          column: taskColumn,
          done: false,
        },
      });
      setIsTaskFormOpen({ state: false, id: null });
    }
  };

  React.useEffect(() => {
    localStorage.getItem("tasksArr")
      ? reduceTasksArr({
          type: "defaulting",
          tasks: JSON.parse(localStorage.getItem("tasksArr")),
        })
      : localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
    console.log("tasksArr changed");
  }, []);
  React.useEffect(() => {
    localStorage.setItem("tasksArr", JSON.stringify(tasksArr));
  }, [tasksArr]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return; // dropped outside any valid column — do nothing

    const taskId = active.id; // which task was dragged (from useDraggable's id)
    const newColumn = over.id; // which column it was dropped on (from useDroppable's id)

    reduceTasksArr({
      type: "moveTaskViaDrag",
      movedTask: taskId,
      newColumn: newColumn,
    });
  }

  return (
    <>
      <section>
        <DndContext onDragEnd={handleDragEnd}>
          {arrayOfColumns.map((priority) => (
            <ColumnSection
              key={priority}
              priority={priority}
              tasks={tasksArr.map((task) => {
                return task.column === priority ? task : null;
              })}
              setIsTaskFormOpen={setIsTaskFormOpen}
              reduceTasksArr={reduceTasksArr}
            />
          ))}
        </DndContext>
      </section>
      <button
        className="addTask"
        onClick={() => setIsTaskFormOpen({ state: true, id: null })}
      >
        add task
      </button>
      {isTaskFormOpen.state && isTaskFormOpen.id === null ? (
        <form className="taskAddingForm" action={addNewTask}>
          <input
            type="text"
            placeholder="enter task title"
            name="taskContent"
            required
          />
          <select name="columnOption" required>
            {arrayOfColumns.map((column) => (
              <option key={column} value={column} name="columnOption">
                {column}
              </option>
            ))}
          </select>
          <button type="submit">
            {isTaskFormOpen.id ? "edit task" : "add task"}
          </button>
        </form>
      ) : isTaskFormOpen.state && isTaskFormOpen.id !== null ? (
        <form className="taskAddingForm" action={addNewTask}>
          <input
            type="text"
            placeholder="enter task title"
            name="taskContent"
            required
          />
          <button type="submit">
            {isTaskFormOpen.id ? "edit task" : "add task"}
          </button>
        </form>
      ) : null}
    </>
  );
}

let changeTasksArr = (tasksArr, action) => {
  switch (action.type) {
    case "add":
      return [...tasksArr, action.newTask];
    case "edit":
      console.log(action.editedTask);
      return tasksArr.map((task) => {
        return task.id == action.editedTask.id ? action.editedTask : task;
      });
    case "delete":
      console.log(action.deletedTaskid);
      return tasksArr.filter((task) => task.id !== action.deletedTaskid);
    case "defaulting":
      return action.tasks;
    case "turnToDone":
      return tasksArr.map((task) =>
        task.id === action.doneTaskId
          ? { ...task, column: task.done ? "To Do" : "Done", done: !task.done }
          : task,
      );
    case "moveTaskViaDrag":
      return tasksArr.map((task) => {
        return task.id === action.movedTask
          ? {
              ...task,
              column: action.newColumn,
              done: action.newColumn === "Done" ? true : false,
            }
          : task;
      });
    default:
      return tasksArr;
  }
};
