import { useContext } from "react";
import { ThemContex } from "../context.js";
export default function Header() {
  let them = useContext(ThemContex);

  return (
    <header className={them.themMode}>
      <h1 className="headerTitle">Kanban</h1>
      <label className="switch">
        <input
          type="checkbox"
          id="themeToggle"
          aria-label="Toggle dark mode"
          onChange={() => {
            them.setThemMode(
              them.themMode === "lightMode" ? "darkMode" : "lightMode",
            );
          }}
        />
        <span className="slider"></span>
      </label>
    </header>
  );
}
