import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { useEth } from "../../contexts/EthContext";

export default function Header() {
  const {
    state: { contract, accounts },
  } = useEth();

  const [balance, setBalance] = useState(0);
  const [individualBalance, setIndividualBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const newBalance = await contract.methods.balances(accounts[0]).call();
      setBalance(newBalance);
      const newIndividual = await contract.methods.getBalanceIndividual().call({ from: accounts[0] });
      setIndividualBalance(newIndividual);
    };
    getBalance();
  }, [accounts, contract]);

  return (
    <header style={{ display: "flex" }}>
      <h2>
        <img src={logo} alt="" />
        LubyGame
      </h2>
      <nav>
        Total na conta: {balance} <p>LBC em jogo: {individualBalance}</p>
      </nav>
    </header>
  );
}
