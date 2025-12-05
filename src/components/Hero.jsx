import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

export default function Hero() {
  const { authenticateUser } = useContext(AuthContext);

  const handleAuthClick = () => {
    if (!authenticateUser) {
      // Usuario no autenticado → login Google
      window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
      return;
    }

    // Redirige según rol
    if (authenticateUser.role === "patient") window.location.href = "/booking";
    else if (authenticateUser.role === "psychologist") window.location.href = "/dashboard";
  };

  // Define texto del botón según rol
  const buttonText = !authenticateUser
    ? "Identifícate"
    : authenticateUser.role === "patient"
    ? "Reservar cita"
    : authenticateUser.role === "psychologist"
    ? "Agenda"
    : "Identifícate";

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight animate-fadeIn">
          Bienestar emocional con
          <span className="text-blue-600"> Galileo Psicólogos</span>
        </h1>

        <p className="text-lg md:text-xl text-blue-700 mt-6 max-w-2xl animate-fadeIn delay-200">
          Psicoterapia profesional con un enfoque humano. Atendemos con cercanía
          y experiencia:
          <span className="font-semibold"> Antonio y Marta</span>, psicólogos
          especializados en ansiedad, autoestima, terapia de pareja y bienestar
          emocional.
        </p>

        <div className="mt-8 flex gap-4 animate-fadeIn delay-300">
          <button
            onClick={handleAuthClick}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-800 transition"
          >
            {buttonText}
          </button>

          <a
            href="#services"
            className="px-6 py-3 rounded-xl border border-blue-700 text-blue-700 hover:bg-blue-100 transition"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
