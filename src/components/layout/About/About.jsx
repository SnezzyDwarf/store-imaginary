import styles from "./About.module.css";
import { useEffect, useRef } from "react";

export default function About({ setLuxuryBottom }) {
  const luxuryRef = useRef(null);

  useEffect(() => {
    const luxury = luxuryRef.current;

    if (!luxury) {
      return;
    }

    function measure() {
      const luxuryBottom =
        luxury.getBoundingClientRect().bottom + window.scrollY;

      setLuxuryBottom(luxuryBottom);
    }

    measure();

    // em telemovel a altura do ecra muda (barra de endereco / rotacao),
    // por isso a medida tem de ser recalculada
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [setLuxuryBottom]);

  const stats = [
    {
      id: "philosophy",
      title: "Philosophy",
      subtitle: "Modern luxury without excess",
      value: "100%",
      description:
        "A fictional fragrance concept designed to explore modern luxury through a refined digital experience.",
    },
    {
      id: "inspiration",
      title: "Inspiration",
      subtitle: "Elegance, individuality and timeless fragrances",
      value: "100%",
      description: "A fictional fragrance.",
    },
    {
      id: "experience",
      title: "Experience",
      subtitle: "A digital store designed to feel as refined",
      value: "100%",
      description: "Made by me Bruno Pernão!",
    },
  ];

  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <div className={styles.text}>
          <span className={styles.label}>The Maison</span>

          <h2 className={styles.title}>AELWEN</h2>

          <p className={styles.lead}>
            A fictional fragrance store created as a frontend development
            project.
          </p>

          <p className={styles.body}>
            Inspired by <em className={styles.highlight}>modern luxury</em>,{" "}
            <span className={styles.brand}>AELWEN</span> explores the
            combination of elegant design, immersive interactions and a refined
            shopping experience.
          </p>

          <p className={styles.note}>
            This project was built with{" "}
            <strong>React, JavaScript, HTML and CSS</strong>, focusing on
            responsive design, smooth animations and a modern user experience.
          </p>
        </div>
        <div className={styles.box}>
          <h3 className={styles.boxTitle}>THE AELWEN CONCEPT</h3>

          <ul className={styles.stats}>
            {stats.map((stat) => (
              <li key={stat.id} className={styles.stat}>
                <div className={styles.statHeader}>
                  <h4>{stat.title}</h4>
                  <span>{stat.subtitle}</span>
                </div>

                <div className={styles.statBody}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <p>{stat.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.container}>
        <h1 ref={luxuryRef}>LUXURY</h1>
      </div>
    </div>
  );
}
