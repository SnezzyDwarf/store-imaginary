import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { CartContext } from "../../../context/CartContex";

import styles from "./Navbar.module.css";

//ui

import Cart from "../../../assets/icons/Cart";

export default function Navbar() {
  const [isActive, setIsActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartList } = useContext(CartContext);
  const cartCount = cartList.length;

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Store", path: "/store" },
  ];

  function handleNav(item) {
    setIsActive(item.name);
    setMenuOpen(false);
    navigate(item.path);
  }

  // fecha o menu mobile com Esc
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.start}>
        <button
          className={`${styles.hamburger} ${
            menuOpen ? styles.hamburgerOpen : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h3 className={styles.brand}>AELWEN</h3>
      </div>

      {/* navigation desktop */}
      <div className={styles.desktop}>
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleNav(item)}
              className={
                isActive === item.name
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* actions: cart + contador */}
      <div className={styles.actions}>
        <Link
          to="/checkout"
          className={styles.cartButton}
          aria-label={`Carrinho com ${cartCount} artigo${cartCount === 1 ? "" : "s"}`}
        >
          <Cart size={22} />
          {/* key = count => o badge "pope" sempre que o número muda */}
          <span
            key={cartCount}
            className={`${styles.badge} ${cartCount === 0 ? styles.badgeEmpty : ""}`}
          >
            {cartCount}
          </span>
        </Link>
      </div>

      {/* navigation mobile */}
      <div
        id="mobile-menu"
        className={`${styles.mobilePanel} ${menuOpen ? styles.open : ""}`}
      >
        <ul className={styles.mobileLinks}>
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleNav(item)}
              className={
                isActive === item.name
                  ? `${styles.mobileLink} ${styles.active}`
                  : styles.mobileLink
              }
            >
              {item.name}
            </li>
          ))}
        </ul>

        <Link
          to="/checkout"
          className={styles.mobileCart}
          onClick={() => setMenuOpen(false)}
        >
          <span>Cart</span>
          <span
            className={`${styles.mobileCartCount} ${
              cartCount === 0 ? styles.countEmpty : ""
            }`}
          >
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}
