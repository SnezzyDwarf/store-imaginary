import { Outlet } from "react-router";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import { useState } from "react";
import { CartContext } from "../../context/CartContex";

export default function MainLayout() {
  const [cartList, setCartList] = useState([]);

  function handlerDelete(id) {
    setCartList((prev) => {
      return prev.filter((product) => product.id !== id);
    });
  }

  return (
    <div>
      <CartContext.Provider value={{ cartList, setCartList, handlerDelete }}>
        <Navbar />

        <main>
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </CartContext.Provider>
    </div>
  );
}
