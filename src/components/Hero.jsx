import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Hero() {
  const { authenticateUser } = useContext(AuthContext);

  const handleAuthClick = () => {
    if (!authenticateUser) {
      window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
      return;
    }

    if (authenticateUser.role === "patient") window.location.href = "/booking";
    else if (authenticateUser.role === "psychologist") window.location.href = "/dashboard";
  };

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
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-300 opacity-20 blur-3xl rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500 opacity-10 blur-3xl rounded-full animate-pulse-slow delay-200"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight animate-fadeIn">
          Bienestar emocional con{" "}
          <span className="text-blue-600">Galileo Psicólogos</span>
        </h1>

        <p className="text-lg md:text-xl text-blue-700 mt-6 max-w-3xl leading-relaxed animate-fadeIn delay-200">
          Te acompañamos en tu proceso de sanación de manera profesional con un enfoque humano. Atendemos con cercanía
          y experiencia: <span className="font-semibold">Antonio y Marta</span>,
          psicólogos especializados en ansiedad, autoestima, parejas, mindfullness, autoayuda
          y bienestar emocional.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fadeIn delay-300">
          <button
            onClick={handleAuthClick}
            className="bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1"
          >
            {buttonText}
          </button>

          <a
            href="#services"
            className="px-8 py-3 rounded-xl border-2 border-blue-700 text-blue-700 hover:bg-blue-100 hover:scale-105 transition-all duration-300"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
