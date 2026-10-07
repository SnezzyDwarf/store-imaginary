import { useState } from "react";
import About from "../../components/layout/About/About";
import Hero from "../../components/layout/Hero/Hero";

export default function Home() {
  const [luxuryBottom, setLuxuryBottom] = useState(0);
  return (
    <div>
      <Hero luxuryBottom={luxuryBottom} />
      <About setLuxuryBottom={setLuxuryBottom} />
    </div>
  );
}
