import { KeyboardProvider } from "./mobile";
import { MobileDeviceProvider } from "./mobile/Device";
import Prototype from "./Prototype";

export default function App() {
  return (
    <MobileDeviceProvider>
      <KeyboardProvider>
        <Prototype />
      </KeyboardProvider>
    </MobileDeviceProvider>
  );
}
