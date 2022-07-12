import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useEth } from "../../contexts/EthContext";

export default function StartGame({ setIsStarted }) {
  const {
    state: { contract, accounts },
  } = useEth();
  
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const newBalance = await contract.methods.balances(accounts[0]).call();
      setBalance(newBalance);
    };
    getBalance();
  }, [accounts, contract]);

  const handleStart = async () => {
    if (balance === "0") {
      await contract.methods.mintLbc(100).send({ from: accounts[0] });
    }
    const start = await contract.methods.startGame(0).call();
    if (start) setIsStarted(true);
  };

  return <>
  <button onClick={handleStart}>Start Game</button>
</>;
}
