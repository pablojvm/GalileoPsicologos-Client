import React from "react";

export default function Hero() {
  return (
    <section className="bg-blue-50 h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-blue-900">Bienvenido a Galileo Psicólogos</h1>
      <p className="text-lg text-blue-700 mb-6 max-w-xl">
        Atención profesional con psicólogos especializados: Antonio y Marta. 
        Reserva tu cita de manera fácil y rápida.
      </p>
      <a href="#booking" className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
        Reservar cita
      </a>
    </section>
  );
}