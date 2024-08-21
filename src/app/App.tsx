import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import { DeviceGuard } from "@/hoc/DeviceGuard";
import { AuthProvider } from "@/hoc/AuthProvider";
import { DataConfigProvider } from "@/hoc/DataConfigProvider";

const needDeviceGuard = process.env.NEXT_PUBLIC_NEED_DEVICE_GUARD ?? 1;

function App() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // const [progress, setProgress] = useState(100);

  // for (let i = 0; i < fakeProgress.length; i++) {
  //   setTimeout(() => {
  //     setProgress(fakeProgress[i]);
  //   }, i * 500); // Simulating API progress
  // }

  return (
    <div id="app" className="bg-overlay">
      {needDeviceGuard == 1 ? (
        <DeviceGuard>
          <AuthProvider>
            <DataConfigProvider>
              <PhaserGame ref={phaserRef} />
            </DataConfigProvider>
          </AuthProvider>
        </DeviceGuard>
      ) : (
        <AuthProvider>
          <DataConfigProvider>
            <PhaserGame ref={phaserRef} />
          </DataConfigProvider>
        </AuthProvider>
      )}
    </div>
  );
}

export default App;
