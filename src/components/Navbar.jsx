import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-700">Galileo Psicólogos</div>
      <ul className="flex gap-6">
        <li><a href="#services" className="hover:text-blue-500">Servicios</a></li>
        <li><a href="#booking" className="hover:text-blue-500">Reservar cita</a></li>
        <li><a href="#contact" className="hover:text-blue-500">Contacto</a></li>
      </ul>
    </nav>
  );
}