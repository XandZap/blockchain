import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useEth } from "../../contexts/EthContext";
import Game from "../game/Game";

export default function StartGame() {
  const {
    state: { contract, accounts, artifact },
  } = useEth();
  const [balance, setBalance] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      const newBalance = await contract.methods.balances(accounts[0]).call();
      setBalance(newBalance);
    };
    getBalance();
  }, [accounts, contract]);

  const handleStart = async () => {
    if (balance === 0) {
      await contract.methods.mintLBC(100).send({ from: accounts[0] });
    }
    const start = await contract.methods.startGame(0).call();
    if (start) setIsStarted(true);

    //console.log("contract: ", await contract.methods.mintLbc(100).send({ from: accounts[0] }));
    //console.log("balance:", await contract.methods.balances(accounts[0]).call());
    //const value = await contract.methods.mintLBC(123).send({from: accounts[0] });
  };

  const demo = (
    <>
      <p>Total de LBC: {balance}</p>
      {isStarted ? (
        <Game balance={balance} />
      ) : (
        <>
          <button onClick={handleStart}>Start Game</button>
        </>
      )}
    </>
  );

  return <div>{!artifact ? <p>No artifact</p> : !contract ? <p>No network</p> : demo}</div>;
}
