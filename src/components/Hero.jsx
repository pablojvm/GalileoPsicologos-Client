export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 h-screen flex items-center">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>
      </div>

      {/* Contenido */}
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
          <a
            href={`${import.meta.env.VITE_API_URL}/auth/google`} // apuntando a tu backend
            className="bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-800 transition"
          >
            Reservar cita
          </a>

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
