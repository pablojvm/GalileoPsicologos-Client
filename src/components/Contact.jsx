export default function ContactSection() {
  return (
    <section id="contact" className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Contáctanos
        </h2>
        <p className="text-gray-600 mb-10">
          Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          
          <form className="bg-white p-8 rounded-2xl shadow">
            <div className="mb-4 text-left">
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                placeholder="Tu nombre"
              />
            </div>

            <div className="mb-4 text-left">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                placeholder="Tu correo"
              />
            </div>

            <div className="mb-4 text-left">
              <label className="block text-gray-700 mb-2">Mensaje</label>
              <textarea
                rows="4"
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                placeholder="Escribe tu mensaje..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>

          <div className="flex flex-col justify-center bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Información de contacto
            </h3>

            <p className="text-gray-600 mb-4">
              <strong>📍 Dirección:</strong> Avenida de Salobreña 36, Motril
            </p>

            <p className="text-gray-600 mb-4">
              <strong>📞 Teléfono:</strong> +34 696 633 362
            </p>
            <p className="text-gray-600 mb-4">+34 616 833 939
            </p>

            <p className="text-gray-600 mb-4">
              <strong>✉️ Email:</strong> galileopsi@gmail.com. 
            </p>
            <p className="text-gray-600 mb-4">mvillarmoron@gmail.com
            </p>

            <p className="text-gray-600">
              <strong>🕒 Horario:</strong> L–V 10:00–21:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
