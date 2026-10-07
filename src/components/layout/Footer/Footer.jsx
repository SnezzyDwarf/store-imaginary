import { useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

import styles from "./Footer.module.css";

const columns = [
  {
    id: "boutique",
    title: "Boutique",
    links: [
      { label: "Home", to: "/" },
      { label: "Shop All", to: "/store" },
      { label: "New Arrivals" },
      { label: "Best Sellers" },
    ],
  },
  {
    id: "maison",
    title: "Maison",
    links: [
      { label: "Our Story" },
      { label: "Philosophy" },
      { label: "Journal" },
    ],
  },
  {
    id: "care",
    title: "Client Care",
    links: [
      { label: "Contact" },
      { label: "Shipping & Returns" },
      { label: "Product Care" },
      { label: "FAQ" },
    ],
  },
  {
    id: "follow",
    title: "Follow",
    links: [
      { label: "Instagram", external: true },
      { label: "Pinterest", external: true },
      { label: "TikTok", external: true },
    ],
  },
];

const legal = ["Privacy Policy", "Terms", "Cookies"];

function preventNavigation(event) {
  event.preventDefault();
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  // reveal suave quando o footer entra no ecra (desativado com reduced motion)
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 48 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.9, ease: "easeOut" },
      };

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubscribed(true);
    setEmail("");
  }

  function handleBackToTop() {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6 });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <motion.div className={styles.inner} {...reveal}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.brandName}>AELWEN</p>
            <span className={styles.brandLabel}>
              Maison de Parfums · Est. 2026
            </span>
            <p className={styles.tagline}>
              A fictional fragrance house where modern luxury meets digital
              couture — a frontend study in elegance, scent and craft.
            </p>
          </div>

          <div className={styles.newsletter}>
            <h3 className={styles.heading}>Join the Maison</h3>
            <p className={styles.newsletterText}>
              Private previews, new arrivals and fragrance stories. No noise —
              only essence.
            </p>

            {subscribed ? (
              <p className={styles.success} role="status">
                Merci — you're on the list.
              </p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <button className={styles.button} type="submit">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.grid}>
          {columns.map((column) => (
            <div key={column.id} className={styles.column}>
              <h3 className={styles.heading}>{column.title}</h3>

              <ul className={styles.list}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link className={styles.link} to={link.to}>
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        className={styles.link}
                        href="#"
                        onClick={preventNavigation}
                      >
                        {link.label}
                        {link.external && (
                          <span className={styles.arrow} aria-hidden="true">
                            ↗
                          </span>
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.colophon}>
          <p className={styles.madeBy}>
            Made by <span>Bruno Pernão</span>
          </p>
          <p className={styles.project}>For The Odin Project</p>
        </div>

        <span className={styles.signature} aria-hidden="true">
          AELWEN
        </span>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} AELWEN · Fictional fragrance house
          </p>

          <ul className={styles.legal}>
            {legal.map((item) => (
              <li key={item}>
                <a
                  className={styles.legalLink}
                  href="#"
                  onClick={preventNavigation}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={styles.toTop}
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </motion.div>
    </div>
  );
}
