import { Link } from "react-router-dom";
import service from "../services/service.config";
import { useEffect, useState } from "react";

function SobreNosotros() {
  const psicologos = [
    {
      nombre: "Antonio Villar Rodríguez",
      rol: "Psicólogo",
      descripcion:
        "Especializado en ansiedad, autoestima y crecimiento personal. Su enfoque es cercano, práctico y orientado a resultados. Cuenta con más de 40 años de experiencia acompañando a jóvenes y adultos.",
      imagen: "/antonio.jpeg",
    },
    {
      nombre: "Marta Villar Morón",
      rol: "Psicóloga",
      descripcion:
        "Marta trabaja desde una perspectiva integradora, combinando herramientas de carácter cognitivo-conductual y emocional. Experta en adicciones, adolescentes, empoderamiento y altas capacidades.",
      imagen: "/marta.jpeg",
    },
  ];

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const { data } = await service.get("/review");
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <h1 className="text-5xl font-bold text-blue-900">Sobre Nosotros</h1>
          <p className="text-lg text-blue-800 max-w-3xl mx-auto">
            En <span className="font-semibold text-blue-600">Galileo Psicólogos</span> trabajamos para ayudarte a recuperar tu bienestar emocional. Nuestro equipo de profesionales ofrece un enfoque cercano, humano y basado en la evidencia.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800">Nuestro Enfoque</h2>
            <p className="text-gray-600 leading-relaxed">
              Somos un equipo de psicólogos comprometidos con una práctica ética, actualizada y centrada en cada persona. Creemos en una psicología accesible, moderna y adaptada a tu ritmo.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Apostamos por métodos terapéuticos basados en ciencia, integrando técnicas de las corrientes cognitivo-conductual, humanista y terapia breve centrada en soluciones.
            </p>
          </div>
          <img src="/despacho.jpeg" alt="Equipo de psicólogos" className="w-full rounded-3xl shadow-lg" />
        </div>
      </section>

      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <h2 className="text-3xl font-semibold text-blue-900">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Cercanía", text: "Apostamos por un trato humano, cálido y respetuoso. Queremos que te sientas escuchado desde el primer minuto." },
              { title: "Profesionalidad", text: "Nuestro equipo está formado por especialistas actualizados en las últimas técnicas basadas en evidencia científica." },
              { title: "Compromiso", text: "Acompañamos a cada persona con dedicación, adaptando el proceso a sus necesidades y objetivos." },
            ].map((valor) => (
              <div key={valor.title} className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
                <h3 className="text-xl font-bold text-blue-600 mb-3">{valor.title}</h3>
                <p className="text-gray-600">{valor.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Profesionales */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Nuestros Profesionales</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {psicologos.map((p) => (
              <div key={p.nombre} className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition">
                <img src={p.imagen} alt={p.nombre} className="w-full h-64 object-cover" />
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{p.nombre}</h3>
                  <p className="text-blue-600 font-medium">{p.rol}</p>
                  <p className="text-gray-600 leading-relaxed">{p.descripcion}</p>
                  <Link to="/booking" className="block w-full bg-blue-600 text-white py-2 rounded-xl text-center hover:bg-blue-700 transition">
                    Reservar cita
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Reseñas */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <h2 className="text-3xl font-bold text-blue-900">Reseñas de Google</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No hay reseñas disponibles.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                  <p className="font-semibold">{review.author_name}</p>
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                  <p className="text-gray-600 mt-2">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección Contacto */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">¿Quieres saber más o empezar terapia?</h2>
        <p className="text-gray-600 mb-8">Estamos aquí para ayudarte. Da el primer paso hoy.</p>
        <Link to="/#contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition">
          Contacta con nosotros
        </Link>
      </section>
    </div>
  );
}

export default SobreNosotros;
