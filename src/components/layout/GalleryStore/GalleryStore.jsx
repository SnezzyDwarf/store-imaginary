import { useContext, useEffect, useState } from "react";
import { getProducts } from "../../../services/api";
import { CartContext } from "../../../context/CartContex";

import Button from "../../ui/button/Button";

import styles from "./GalleryStore.module.css";

export default function GalleryStore() {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const { setCartList } = useContext(CartContext);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <h2>Is loading products...</h2>;
  }

  if (error) {
    return <h2>Something Went Wrong...</h2>;
  }

  if (products.length === 0) {
    return <h2>No products found...</h2>;
  }

  function getWrappedIndex(index) {
    if (products.length === 0) {
      return 0;
    }
    return (index + products.length) % products.length;
  }

  const leftIndex = getWrappedIndex(activeIndex - 1);

  const rightIndex = getWrappedIndex(activeIndex + 1);

  function handleProductClick(index) {
    setActiveIndex(index);
  }

  function handlerCartClick(product) {
    setCartList((prev) => {
      const newList = [...prev, product];

      console.log(newList);

      return newList;
    });
  }

  return (
    <>
      {!isOpen && (
        <div className={styles.gallery}>
          <ul className={styles.container}>
            {/*===============Left gallery===============*/}

            <li
              key="left"
              className={styles.productLeft}
              onClick={() => handleProductClick(leftIndex)}
              role="button"
              tabIndex={0}
              aria-label={`Ver ${products[leftIndex].title}`}
            >
              <img
                src={products[leftIndex].images[0]}
                alt={products[leftIndex].title}
                draggable={false}
              />
            </li>

            {/*==============Center gallery=============*/}

            <li key="center" className={styles.productActive}>
              <img
                src={products[activeIndex].images[0]}
                alt={products[activeIndex].title}
                draggable={false}
              />
            </li>

            {/*===============Right gallery==============*/}

            <li
              key="right"
              className={styles.productRigth}
              onClick={() => handleProductClick(rightIndex)}
              role="button"
              tabIndex={0}
              aria-label={`Ver ${products[rightIndex].title}`}
            >
              <img
                src={products[rightIndex].images[0]}
                alt={products[rightIndex].title}
                draggable={false}
              />
            </li>
          </ul>

          <div className={styles.description}>
            <h2>{products[activeIndex].title}</h2>
            <p>{products[activeIndex].price}</p>
            <Button onClick={() => setIsOpen(true)}>VIEW DETAILS</Button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className={styles.detailsWrapper}>
          <div className={styles.details}>
            <span className={styles.detailsWatermark} aria-hidden="true">
              AELWEN
            </span>

            <button
              className={styles.detailsClose}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar detalhes"
            >
              ✕
            </button>

            <div className={styles.detailsImage}>
              <img
                src={products[activeIndex].images[0]}
                alt={products[activeIndex].title}
                draggable={false}
              />
            </div>

            <div className={styles.detailsInfo}>
              <span className={styles.detailsBrand}>
                {products[activeIndex].brand ?? "Aelwen"}
              </span>

              <h2 className={styles.detailsTitle}>
                {products[activeIndex].title}
              </h2>

              <p className={styles.detailsPrice}>
                {products[activeIndex].price}
              </p>

              <span className={styles.detailsDivider} aria-hidden="true" />

              <p className={styles.detailsDescription}>
                {products[activeIndex].description}
              </p>

              <button
                onClick={() => handlerCartClick(products[activeIndex])}
                className={styles.detailsCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
