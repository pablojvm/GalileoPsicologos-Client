import React from "react";

const services = [
  { name: "Terapia individual", duration: "50 min" },
  { name: "Terapia de pareja", duration: "60 min" },
  { name: "Sesión online", duration: "50 min" },
  { name: "Consulta presencial", duration: "50 min" },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12 text-blue-900">Servicios</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-md w-64">
            <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
            <p className="text-blue-700">{service.duration}</p>
          </div>
        ))}
      </div>
    </section>
  );
}