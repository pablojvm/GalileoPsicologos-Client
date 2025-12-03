export default function SobreNosotros() {

    const psicologos = [
    {
      nombre: "Antonio Villar Rodríguez",
      rol: "Psicólogo Sanitario",
      descripcion:
        "Especializado en ansiedad, autoestima y crecimiento personal. Su enfoque es cercano, práctico y orientado a resultados. Cuenta con más de 40 años de experiencia acompañando a jóvenes y adultos.",
      imagen:
        "/antonio.jpeg",
    },
    {
      nombre: "Marta Villar Morón",
      rol: "Psicóloga Clínica",
      descripcion:
        "Marta trabaja desde una perspectiva integradora, combinando herramientas de la terapia cognitivo-conductual y la terapia emocional. Es experta en depresión, trauma y terapia de pareja.",
      imagen:
        "/marta.jpeg",
    },
  ];
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-6">
          Sobre Nosotros
        </h1>

        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
          En <span className="font-semibold text-blue-600">Galileo Psicólogos </span>
          trabajamos para ayudarte a recuperar tu bienestar emocional. Nuestro equipo 
          de profesionales ofrece un enfoque cercano, humano y basado en la evidencia.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Nuestro Enfoque
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Somos un equipo de psicólogos comprometidos con una práctica ética, 
              actualizada y centrada en cada persona. Creemos en una psicología 
              accesible, moderna y adaptada a tu ritmo.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Apostamos por métodos terapéuticos basados en ciencia, integrando 
              técnicas de las corrientes cognitivo-conductual, humanista y terapia 
              breve centrada en soluciones.
            </p>
          </div>

          <img
            src="/despacho.jpeg"
            alt="Equipo de psicólogos"
            className="w-full rounded-3xl shadow-lg"
          />
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
            Nuestros Valores
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Cercanía</h3>
              <p className="text-gray-600">
                Apostamos por un trato humano, cálido y respetuoso. Queremos que 
                te sientas escuchado desde el primer minuto.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Profesionalidad</h3>
              <p className="text-gray-600">
                Nuestro equipo está formado por especialistas actualizados en las 
                últimas técnicas basadas en evidencia científica.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow text-center">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Compromiso</h3>
              <p className="text-gray-600">
                Acompañamos a cada persona con dedicación, adaptando la terapia a 
                sus necesidades y objetivos.
              </p>
            </div>
          </div>
        </div>

        <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Nuestros Profesionales
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {psicologos.map((p) => (
          <div
            key={p.nombre}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 text-left">
              <h3 className="text-2xl font-semibold text-gray-800">
                {p.nombre}
              </h3>
              <p className="text-blue-600 font-medium">{p.rol}</p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {p.descripcion}
              </p>

              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                Reservar cita
              </button>
            </div>
          </div>
        ))}
      </div>

        </div>

        <div className="text-center mt-20">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            ¿Quieres saber más o empezar terapia?
          </h2>

          <p className="text-gray-600 mb-8">
            Estamos aquí para ayudarte. Da el primer paso hoy.
          </p>

          <a
            href="/contacto"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Contactar con nosotros
          </a>
        </div>
      </div>
    </section>
  );
}
