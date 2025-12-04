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
      // Enviar al equipo
      const res1 = await fetch("http://localhost:5005/api/email/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailToTeam),
      });
      const data1 = await res1.json();
      if (!data1.success) throw new Error("Error enviando correo al equipo");

      // Enviar al cliente
      const res2 = await fetch("http://localhost:5005/api/email/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailToClient),
      });
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
    <section id="contact" className="bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h2>
        <p className="text-gray-600 mb-10">
          Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow flex flex-col gap-4"
          >
            <div className="text-left">
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                placeholder="Tu correo"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-gray-700 mb-2">Mensaje</label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                placeholder="Escribe tu mensaje..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>

          {/* Información de contacto */}
          <div className="flex flex-col justify-center bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Información de contacto
            </h3>

            <p className="text-gray-600 mb-4">
              <strong>📍 Dirección:</strong> Avenida de Salobreña 36, Motril
            </p>

            <p className="text-gray-600 mb-4">
              <strong>📞 Teléfono:</strong> +34 696 633 362 / +34 616 833 939
            </p>

            <p className="text-gray-600 mb-4">
              <strong>✉️ Email:</strong> galileopsi@gmail.com / mvillarmoron@gmail.com
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
