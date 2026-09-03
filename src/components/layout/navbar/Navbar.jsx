import { useState } from "react";

import "./Navbar.css";

//img
import Logo from "../../../assets/images/LogoParfum.png";

//ui
import Button from "../../ui/button/Button";
import Bag from "../../../assets/ui/Bag";

export default function Navbar() {
  const [isActive, setIsActive] = useState("home");

  const navItems = ["Home", "About", "Products"];

  return (
    <nav className="navbar">
      <img src={Logo} alt="Logo" className="navbar__logo" />

      {/* navigation desktop */}
      <div className="navbar__desktop">
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setIsActive(item)}
              className={
                isActive === item
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Button variant="primary">
            <Bag size={30} />
          </Button>
          <Button>Light</Button>
        </div>
      </div>

      {/* navigation mobile */}
      <div className="navbar__mobile">
        <button className="navbar__hamburger" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
