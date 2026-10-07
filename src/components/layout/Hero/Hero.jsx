import { motion, useScroll, useTransform, useSpring } from "motion/react";

import { useEffect, useRef, useState } from "react";

import styles from "./Hero.module.css";

import HeroImage from "../../../assets/images/Hero.png";
import Button from "../../ui/button/Button";

const LUXURY_OFFSET = 100;

export default function Hero({ luxuryBottom }) {
  const [distance, setDistance] = useState(0); // to  save distance of image to the bottom of the page

  const imageRef = useRef(null);

  const { scrollY } = useScroll();

  const luxuryScrollEnd = luxuryBottom - window.innerHeight;

  const luxuryProgress = useTransform(scrollY, [0, luxuryScrollEnd], [0, 1]);

  useEffect(() => {
    // Whe save the current reference of the image
    const image = imageRef.current;

    function measure() {
      if (!image) {
        return;
      }

      // to know the bottom of the image in relation of viewport
      const imageBottom = image.getBoundingClientRect().bottom + window.scrollY;

      //distance that image can travel
      const calculatedDistance = luxuryBottom - imageBottom + LUXURY_OFFSET;

      setDistance(Math.max(calculatedDistance, 0));
    }

    measure();

    image?.addEventListener("load", measure); // to recaculate measure when the loading of image can take a bit, to have the real distance
    window.addEventListener("resize", measure);

    return () => {
      image?.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, [luxuryBottom]);

  const yRaw = useTransform(luxuryProgress, [0, 1], [0, distance]);

  const y = useSpring(yRaw, {
    stiffness: 80,
    damping: 40,
  });
  const rotate = useTransform(luxuryProgress, [0, 1], [25, 0]);

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <motion.img
          ref={imageRef}
          src={HeroImage}
          alt="A bottle of parfum"
          className={styles.image}
          style={{ y, rotate }}
        />

        <h1>AELWEN</h1>
        <Button>See Shop</Button>
      </div>
    </div>
  );
}
