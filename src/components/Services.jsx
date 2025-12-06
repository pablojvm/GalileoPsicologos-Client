import React from "react";

const services = [
  { name: "Adultos", duration: "60 min", pic: "/individual.jpeg" },
  { name: "Parejas", duration: "60 min", pic: "/pareja.jpeg" },
  { name: "Adicciones", duration: "60 min", pic: "/adicciones.jpeg" },
  { name: "Adolescentes", duration: "60 min", pic: "/adolescente.jpeg" },
  { name: "Altas capacidades", duration: "60 min", pic: "/capacidades.jpeg" },
  { name: "Sesión Online", duration: "60 min", pic: "/online.jpeg" },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-blue-50 to-white text-center">
      <h2 className="text-4xl font-bold mb-12 text-blue-900">Nuestros Servicios</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg overflow-hidden w-64 transform transition hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={service.pic}
              alt={service.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-blue-600 font-medium">{service.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
