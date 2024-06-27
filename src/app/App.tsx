import React, { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import useClaimInterval from "@/lib/hooks/useClaimInterval";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  useClaimInterval();

  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
    </div>
  );
}

export default App;
