import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

export default function Booking() {
  const { loggedUserId } = useContext(AuthContext);
  const [formData, setFormData] = useState("");

  const fechasBloqueadas = {
    Antonio: [new Date("2025-12-05"), new Date("2025-12-10")],
    Marta: [new Date("2025-12-07"), new Date("2025-12-12")],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaCompleta = new Date(formData.fecha);
    const [horas, minutos] = formData.hora.split(":");
    fechaCompleta.setHours(horas);
    fechaCompleta.setMinutes(minutos);

    try {
      const response = await service.post("/appointment", {
        psychologist: formData.psicologo,
        patient: loggedUserId,
        service: formData.service,
        date: fechaCompleta,
        coment: formData.coment,
      });

      console.log("Reserva creada:", response.data);
      alert("¡Cita reservada correctamente!");
    } catch (error) {
      console.error(error);
      alert("Error al crear la cita");
    }
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Reservar Cita
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6"
      >
        <label className="flex flex-col">
          Psicólogo
          <select
            name="psicologo"
            value={formData.psicologo}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione un profesional</option>
            <option value="Antonio">Antonio</option>
            <option value="Marta">Marta</option>
          </select>
        </label>

        {/* Servicio */}
        <label className="flex flex-col">
          Servicio
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg"
            required
          >
            <option value="">Selecciona un servicio</option>
            <option value="Terapia individual">Terapia adulto</option>
            <option value="Terapia de pareja">Terapia de pareja</option>
            <option value="Terapia online">Terapia adolescente</option>
            <option value="Terapia individual">Terapia niño</option>
            <option value="Terapia de pareja">Altas capacidades</option>
            <option value="Terapia online">Terapia online</option>
          </select>
        </label>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Fecha */}
          <label className="flex flex-col flex-1">
            Fecha
            <DatePicker
              selected={formData.fecha}
              onChange={(date) => setFormData({ ...formData, fecha: date })}
              minDate={new Date()}
              excludeDates={fechasBloqueadas[formData.psicologo]}
              placeholderText="Selecciona una fecha"
              className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              dateFormat="dd/MM/yyyy"
              required
            />
          </label>

          {/* HORA */}
          <label className="flex flex-col w-40">
            Hora
            <select
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Selecciona hora
              </option>

              {Array.from({ length: 12 }).map((_, index) => {
                const hour = index + 10; // Empieza en 10 hasta 21

                return (
                  <>
                    <option
                      key={`${hour}:00`}
                      value={`${String(hour).padStart(2, "0")}:00`}
                    >
                      {String(hour).padStart(2, "0")}:00
                    </option>

                    <option
                      key={`${hour}:30`}
                      value={`${String(hour).padStart(2, "0")}:30`}
                    >
                      {String(hour).padStart(2, "0")}:30
                    </option>
                  </>
                );
              })}
            </select>
          </label>
        </div>

        {/* Comentarios */}
        <label className="flex flex-col">
          Comentario
          <textarea
            name="comentarios"
            value={formData.coment}
            onChange={handleChange}
            placeholder="Información adicional..."
            className="mt-2 p-2 border rounded-lg"
            rows="4"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Reservar cita
        </button>
      </form>
    </section>
  );
}
