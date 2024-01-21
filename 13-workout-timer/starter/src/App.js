import { useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import Time from "./Time";

function App() {
  const [allowSound, setAllowSound] = useState(true);
  return (
    <main>
      <h1>Workout timer</h1>
      <Time />
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator allowSound={allowSound} />
    </main>
  );
}

export default App;
