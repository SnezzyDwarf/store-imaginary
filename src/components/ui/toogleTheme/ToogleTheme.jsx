import { useState } from "react";
import Button from "../button/Button";

export default function ToogleTheme() {
  const [theme, setTheme] = useState("light");

  function handleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div>
      {theme === "light" && <Button onClick={handleTheme}>ligth</Button>}

      {theme === "dark" && <button onClick={handleTheme}>dark</button>}
    </div>
  );
}
