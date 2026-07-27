import Header from "./componants/header.jsx";
import KanbanBody from "./componants/KanBanBody.jsx";
import React from "react";
import { ThemContex } from "./context.js";

export default function App() {
  const [columnArr, reducecolumArr] = React.useReducer(changecolumArr, [
    "To Do",
    "In Progress",
    "Done",
  ]);

  //const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [themMode, setThemMode] = React.useState("lightMode");

  /* let openFormColumn = () => {
    setIsFormOpen(true);
  };*/

  /* let addNewColumn = (formData) => {
    const newColumnNameInput = formData.get("columnName"); // Access the input element by its name
    if (!newColumnNameInput.trim()) return; // Ensure the column name is not empty

    reducecolumArr({
      type: "add",
      newColumnName: newColumnNameInput,
    });
    setIsFormOpen(false);
  };*/

  /* React.useEffect(() => {
    localStorage.getItem("columnArr")
      ? reducecolumArr({
          type: "defaulting",
          columnArr: JSON.parse(localStorage.getItem("columnArr")),
        })
      : localStorage.setItem("columnArr", JSON.stringify(columnArr));
    console.log("columnArr changed");
  }, []);
  React.useEffect(() => {
    localStorage.setItem("columnArr", JSON.stringify(columnArr));
  }, [columnArr]);*/

  return (
    <ThemContex.Provider value={{ themMode, setThemMode }}>
      <Header />
      <KanbanBody arrayOfColumns={columnArr} />
    </ThemContex.Provider>
  );
}

let changecolumArr = (columnArr, action) => {
  switch (action.type) {
    case "add":
      return [...columnArr, action.newColumnName];
    case "change":
      return columnArr.map((oldName) => {
        oldName === action.changedCloumnName
          ? action.changedCloumnName
          : oldName;
      });
    case "delete":
      return columnArr.filter((oldName) => oldName !== action.deletedName);
    case "defaulting":
      return action.columnArr;
    default:
      return columnArr;
  }
};
//here you should pass the whole task not just the id

/*

<button className="addingPriorityColumn" onClick={openFormColumn}>
        add new column
      </button>

      {isFormOpen && (
        <form className="addingPriorityColumnForm" action={addNewColumn}>
          <input
            type="text"
            placeholder="enter new column name"
            name="columnName"
          />
          <button type="submit">add column</button>
        </form>
      )} 
*/
