import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnimated = () => {
  return (
    <TypeAnimation
      sequence={SEQUENCE}
      speed={50}
      wrapper="span"
      repeat={Infinity}
      className="tst-sequence"
    />
  );
};

export default TypingAnimated;

const SEQUENCE = [
  "Escribe lo que piensas anónimamente",
  500,
  "Respira. Eres más fuerte de lo que crees.",
  1000,
  "Un día a la vez.",
  1000,
  "Tú importas.",
  1000,
  "Este dolor no durará para siempre.",
  1000,
  "Pequeños pasos, grandes logros.",
  1000,
  "Eres capaz.",
  1000,
  "La luz llegará.",
  1000,
  "Tú eres suficiente.",
  1000,
  "Avanza, incluso si es un paso a la vez.",
  1000,
  "Tú puedes superarlo.",
  1000,
  "Sigue respirando y sigue adelante.",
  1000,
  "Recuerda que el progreso no siempre es lineal",
  1000,
];
