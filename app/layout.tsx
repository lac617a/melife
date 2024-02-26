import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Melife",
  applicationName: "Melife",
  authors: {
    name: "Dominyel Rivera",
    url: "https://yoydev.com",
  },
  keywords: [
    "Apoyo",
    "Empatía",
    "Conexión",
    "Anonimato",
    "Confianza",
    "Comunidad",
    "Seguridad",
    "Compartir",
    "Reflexión",
    "Privacidad",
    "Autenticidad",
    "Escucha activa",
    "Bienestar emocional",
    "Crecimiento personal",
    "Libertad de expresión",
  ],
  description:
    "Te invito a explorar una plataforma completamente anónima donde puedes expresar libremente tus pensamientos y sentimientos. Aquí, tu privacidad es nuestra prioridad absoluta. Comparte tus preocupaciones, alegrías y reflexiones sin temor ni juicio. Juntos, creamos un espacio seguro para el crecimiento personal y la conexión auténtica. Únete a nuestra comunidad y descubre el poder de ser escuchado, comprendido y apoyado, sin importar quién eres o de dónde vienes.",
};

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
