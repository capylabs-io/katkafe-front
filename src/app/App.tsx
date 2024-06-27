import React, { useEffect, useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import useClaimInterval from "@/lib/hooks/useClaimInterval";
import { useFetchRestaurants } from "@/lib/hooks/restaurant/useRestaurant";

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  useClaimInterval();
  const { fetchRestaurants } = useFetchRestaurants();
  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="app">
      <PhaserGame ref={phaserRef} />
    </div>
  );
}

export default App;
