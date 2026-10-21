import { useState } from "react";
import "./App.css";

const BOTOES = [
  "C", "⌫", "÷", "×",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", ".",
];

const OPERADORES = { "÷": "/", "×": "*", "-": "-", "+": "+" };

function calcular(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Erro" : a / b;
    default: return b;
  }
}

export default function App() {
  const [visor, setVisor] = useState("0");
  const [anterior, setAnterior] = useState(null);
  const [operacao, setOperacao] = useState(null);
  const [limparVisor, setLimparVisor] = useState(false);

  function digitar(valor) {
    if (visor === "Erro" || limparVisor) {
      setVisor(valor === "." ? "0." : valor);
      setLimparVisor(false);
      return;
    }
    if (valor === "." && visor.includes(".")) return;
    setVisor(visor === "0" && valor !== "." ? valor : visor + valor);
  }

  function escolherOperacao(op) {
    if (visor === "Erro") return;
    if (operacao && !limparVisor) {
      const resultado = calcular(anterior, parseFloat(visor), operacao);
      setVisor(String(resultado));
      setAnterior(resultado === "Erro" ? null : resultado);
    } else {
      setAnterior(parseFloat(visor));
    }
    setOperacao(op);
    setLimparVisor(true);
  }

  function igual() {
    if (!operacao || anterior === null) return;
    const resultado = calcular(anterior, parseFloat(visor), operacao);
    setVisor(String(resultado));
    setAnterior(null);
    setOperacao(null);
    setLimparVisor(true);
  }

  function limpar() {
    setVisor("0");
    setAnterior(null);
    setOperacao(null);
    setLimparVisor(false);
  }

  function apagar() {
    if (limparVisor || visor === "Erro") return;
    setVisor(visor.length > 1 ? visor.slice(0, -1) : "0");
  }

  function aoClicar(b) {
    if (b === "C") return limpar();
    if (b === "⌫") return apagar();
    if (b === "=") return igual();
    if (OPERADORES[b]) return escolherOperacao(OPERADORES[b]);
    digitar(b);
  }

  return (
    <div className="calculadora">
      <div className="visor">{visor}</div>
      <div className="teclado">
        {BOTOES.map((b) => (
          <button
            key={b}
            onClick={() => aoClicar(b)}
            className={`${OPERADORES[b] ? "op" : ""} ${b === "=" ? "igual" : ""} ${b === "0" ? "zero" : ""}`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
