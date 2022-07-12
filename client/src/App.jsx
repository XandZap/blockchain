import { useEth } from "./contexts/EthContext";
import "./App.css";
import StartGame from "./components/start/StartGame";
import Loading from "./components/loading/Loading";
import { useState } from "react";
import Game from "./screens/game/Game";
import Header from "./components/UI/Header";

function App() {
  const {
    state: { contract, artifact },
  } = useEth();

  const [isStarted, setIsStarted] = useState(false);

  if (!artifact || !contract) return <Loading />;

  return (
    <>
      <Header />
      {!isStarted && <StartGame setIsStarted={setIsStarted} />}
      {isStarted && <Game />}
    </>
  );
}

export default App;
