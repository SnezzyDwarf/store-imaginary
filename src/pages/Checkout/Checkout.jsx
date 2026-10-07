import { useState, useContext } from "react";

import { CartContext } from "../../context/CartContex";

import styles from "./Checkout.module.css";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const { cartList, handlerDelete } = useContext(CartContext);

  const totalValue = cartList.reduce((total, product) => {
    return total + product.price;
  }, 0);

  const formattedTotal = totalValue.toFixed(2);

  return (
    <div className={styles.checkout}>
      <div className={styles.panel}>
        {/* ==== Header ==== */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>Aelwen Parfums</span>
          <h2 className={styles.title}>Checkout</h2>
          <span className={styles.headerRule} />
        </header>

        <div className={styles.grid}>
          {/* ==== Left: Information ==== */}
          <section className={styles.infoSection}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex}>01</span>
              <h3>Information</h3>
            </div>

            <form className={styles.form}>
              <div className={styles.nameRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="First name" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="Last name" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Street, number, city"
                />
              </div>

              <fieldset className={styles.paymentGroup}>
                <legend>Payment Method</legend>

                <div className={styles.paymentOptions}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === "credit"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Credit Card</span>
                  </label>

                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>PayPal</span>
                  </label>

                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="applePay"
                      checked={paymentMethod === "applePay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Apple Pay</span>
                  </label>
                </div>
              </fieldset>

              {paymentMethod === "credit" && (
                <div className={styles.additionalFields}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardHolder">Card Holder Name</label>
                    <input
                      type="text"
                      id="cardHolder"
                      placeholder="Name as printed on card"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className={styles.additionalFields}>
                  <button type="button" className={styles.altButton}>
                    Login to PayPal
                  </button>
                </div>
              )}

              {paymentMethod === "applePay" && (
                <div className={styles.additionalFields}>
                  <button type="button" className={styles.altButton}>
                    Login to Apple Pay
                  </button>
                </div>
              )}
            </form>
          </section>

          {/* ==== Right ==== */}
          <section className={styles.orderSection}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex}>02</span>
              <h3>Your Order</h3>
            </div>

            <div className={styles.cartList}>
              {cartList.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty</p>
              ) : (
                cartList.map((product) => (
                  <div key={product.id} className={styles.cartItem}>
                    <img src={product.images[0]} alt={product.title} />
                    <div className={styles.cartItemInfo}>
                      <h4>{product.title}</h4>
                    </div>
                    <span className={styles.cartItemPrice}>
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handlerDelete(product.id)}
                      aria-label={`Remover ${product.title} do carrinho`}
                    >
                      <span className={styles.removeIcon} aria-hidden="true">
                        ×
                      </span>
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className={styles.summary}>
              <div className={styles.totalRow}>
                <span className={styles.label}>Subtotal</span>
                <span className={styles.value}>R$ {formattedTotal}</span>
              </div>

              <div className={styles.totalRow}>
                <span className={styles.label}>Shipping</span>
                <span className={styles.value}>Complimentary</span>
              </div>

              <div className={`${styles.totalRow} ${styles.total}`}>
                <span className={styles.label}>Total</span>
                <span className={styles.value}>R$ {formattedTotal}</span>
              </div>

              <button type="button" className={styles.purchaseButton}>
                Complete Purchase
              </button>

              <p className={styles.secureNote}>
                Secure payment · Encrypted checkout
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
