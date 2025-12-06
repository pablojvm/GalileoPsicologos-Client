import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailToTeam = {
      to: "galileopsi@gmail.com, mvillarmoron@gmail.com",
      subject: `Nuevo mensaje de ${formData.nombre} para consulta`,
      message: `
        <p><strong>Nombre:</strong> ${formData.nombre}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Mensaje:</strong> ${formData.mensaje}</p>
      `,
    };

    const emailToClient = {
      to: formData.email,
      subject: `Confirmación de mensaje enviado a Galileo Psicólogos`,
      message: `
        Su mensaje ha sido enviado. En breve nuestros profesionales se pondrán en contacto con usted. ¡Muchas gracias!
      `,
    };

    try {
      const res1 = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/email/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailToTeam),
        }
      );

      const data1 = await res1.json();
      if (!data1.success) throw new Error("Error enviando correo al equipo");

      const res2 = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/email/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailToTeam),
        }
      );

      const data2 = await res2.json();
      if (!data2.success) throw new Error("Error enviando correo al cliente");

      alert("¡Correo enviado correctamente!");
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (err) {
      console.error(err);
      alert("Error enviando correo");
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-blue-50 to-white py-20 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Contáctanos</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes
          posible.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-5 transition hover:shadow-2xl"
          >
            <div className="text-left">
              <label className="block text-gray-700 mb-2 font-medium">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300 transition"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300 transition"
                placeholder="Tu correo"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-gray-700 mb-2 font-medium">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300 transition"
                placeholder="Escribe tu mensaje..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
            >
              Enviar Mensaje
            </button>
          </form>

          {/* Información de contacto */}
          <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col justify-center gap-4 transition hover:shadow-2xl text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Información de contacto
            </h3>

            <p className="text-gray-600 flex items-center gap-2">
              <span>📍</span> Avenida de Salobreña 36, Motril
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <span>📞</span> +34 696 633 362 / +34 616 833 939
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <span>✉️</span> galileopsi@gmail.com / mvillarmoron@gmail.com
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <span>🕒</span> Lunes – Viernes 10:00–21:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
