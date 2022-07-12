export default function Question({ question, handleAnswer }) {
  return (
    <div>
      <p>Questao {question.number}</p>
      <p>{question.text}</p>
      <button onClick={handleAnswer.bind(this, "a")}>A) {question.a}</button>
      <button onClick={handleAnswer.bind(this, "b")}>B) {question.b}</button>
      <button onClick={handleAnswer.bind(this, "c")}>C) {question.c}</button>
      <button onClick={handleAnswer.bind(this, "d")}>D) {question.d}</button>
    </div>
  );
}
