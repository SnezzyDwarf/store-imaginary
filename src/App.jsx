import AppRoutes from "./routes/AppRoutes";

import { ReactLenis } from "lenis/react";

export default function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        smoothWheel: true,
      }}
    >
      <AppRoutes />
    </ReactLenis>
  );
}
