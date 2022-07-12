import React, { useEffect, useState } from "react";
import Question from "../../components/game/Question";
import { useEth } from "../../contexts/EthContext";
import { questions } from "../../shared/mock/questions";

export default function Game() {
  const {
    state: { contract, accounts },
  } = useEth();

  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState(0);

  useEffect(() => {
    const getBalance = async () => {};
    getBalance();
  }, [accounts, contract]);

  const setSuccess = async () => {
    const success = await contract.methods.correctAnswer(5).send({ from: accounts[0] });
    console.log("success :", success);
    setQuestion(question + 1);
  };

  const setFail = async () => {
    const incorrect = await contract.methods.incorrectAnswer(5).send({ from: accounts[0] });
    console.log("claim :", incorrect);
    setQuestion(question + 1);
  };

  const handleAnswer = (answer) => {
    setAnswer(answer);
    console.log("answer  :", answer === questions[question].answer);
    answer === questions[question].answer ? setSuccess() : setFail();
  };

  if (question === 4) return <p>Fim de jogo</p>;

  return (
    <div>
      <Question question={questions[question]} handleAnswer={handleAnswer} />
      {answer && <p>resposta: {answer}</p>}
      {question}
    </div>
  );
}
