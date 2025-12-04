import { useState, useContext, useEffect } from "react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const { loggedUserId, setLoggedUserId } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [psychologists, setPsychologists] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const navigate = useNavigate();

  // Token desde URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setLoggedUserId(payload._id);
      navigate("/booking", { replace: true });
    }
  }, [navigate, setLoggedUserId]);

  // Obtener psicólogos
  useEffect(() => {
    const getPsychologists = async () => {
      try {
        const res = await service.get("user/psychologists");
        setPsychologists(res.data);
      } catch (error) {
        console.error("Error fetching psychologists:", error);
      }
    };
    getPsychologists();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cargar horas ocupadas al cambiar psicólogo o fecha
  useEffect(() => {
    const cargarHorasOcupadas = async () => {
      if (!formData.fecha || !formData.psicologo) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/appointment/availability?psychologist=${formData.psicologo}&date=${formData.fecha}`
        );
        const data = await res.json();
        setHorasOcupadas(data); // ejemplo: ["10:30", "11:00"]
        setHoraSeleccionada(null);
      } catch (err) {
        console.error("Error cargando disponibilidad:", err);
      }
    };
    cargarHorasOcupadas();
  }, [formData.fecha, formData.psicologo]);

  const horasDelDia = Array.from({ length: 12 }).flatMap((_, index) => {
    const hour = index + 10;
    return [`${String(hour).padStart(2, "0")}:00`, `${String(hour).padStart(2, "0")}:30`];
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!horaSeleccionada) return alert("Debes seleccionar una hora");

    const fechaCompleta = new Date(formData.fecha);
    const [horas, minutos] = horaSeleccionada.split(":");
    fechaCompleta.setHours(Number(horas));
    fechaCompleta.setMinutes(Number(minutos));

    try {
      await service.post("/appointment", {
        psychologist: formData.psicologo,
        patient: loggedUserId,
        service: formData.service,
        date: fechaCompleta,
        coment: formData.coment,
      });
      alert("¡Cita reservada correctamente!");
    } catch (error) {
      console.error("Error creando cita:", error);
      alert("Error al crear la cita");
    }
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Reservar Cita</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6">
        {/* Psicólogo */}
        <label className="flex flex-col">
          Psicólogo
          <select
            name="psicologo"
            value={formData.psicologo || ""}
            onChange={(e) => {
              handleChange(e);
              setHoraSeleccionada(null);
            }}
            className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione un profesional</option>
            {psychologists.map((psico) => (
              <option key={psico._id} value={psico._id}>
                {psico.name}
              </option>
            ))}
          </select>
        </label>

        {/* Servicio */}
        <label className="flex flex-col">
          Servicio
          <select
            name="service"
            value={formData.service || ""}
            onChange={handleChange}
            className="mt-2 p-2 border rounded-lg"
            required
          >
            <option value="">Selecciona un servicio</option>
            <option value="Terapia adulto">Terapia adulto</option>
            <option value="Terapia de pareja">Terapia de pareja</option>
            <option value="Terapia adolescente">Terapia adolescente</option>
            <option value="Terapia niño">Terapia niño</option>
            <option value="Altas capacidades">Altas capacidades</option>
            <option value="Terapia online">Terapia online</option>
          </select>
        </label>

        {/* Fecha y hora */}
        <div className="flex flex-col md:flex-row gap-6">
          <label className="flex flex-col flex-1">
            Fecha
            <DatePicker
              selected={formData.fecha}
              onChange={(date) => {
                setFormData({ ...formData, fecha: date });
                setHoraSeleccionada(null);
              }}
              minDate={new Date()}
              placeholderText="Selecciona una fecha"
              className="mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              dateFormat="dd/MM/yyyy"
              required
            />
          </label>

          <label className="flex flex-col flex-1">
            Hora
            <div className="grid grid-cols-4 gap-2 mt-2">
              {horasDelDia.map((hora) => {
                const ocupada = horasOcupadas.some((ocupadaHora) => {
                  const [h, m] = ocupadaHora.split(":").map(Number);
                  const [hh, mm] = hora.split(":").map(Number);
                  const ocupadaMin = h * 60 + m;
                  const horaMin = hh * 60 + mm;
                  return horaMin === ocupadaMin || horaMin === ocupadaMin + 30;
                });
                const seleccionada = hora === horaSeleccionada;
                return (
                  <button
                    key={hora}
                    type="button"
                    disabled={ocupada}
                    onClick={() => setHoraSeleccionada(hora)}
                    className={`
                      py-2 rounded-lg font-semibold transition
                      ${ocupada ? "bg-gray-300 cursor-not-allowed line-through" : ""}
                      ${seleccionada ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}
                    `}
                  >
                    {hora}
                  </button>
                );
              })}
            </div>
          </label>
        </div>

        {/* Comentario */}
        <label className="flex flex-col">
          Comentario
          <textarea
            name="coment"
            value={formData.coment || ""}
            onChange={handleChange}
            placeholder="Información adicional..."
            className="mt-2 p-2 border rounded-lg"
            rows="4"
          />
        </label>

        <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
          Reservar cita
        </button>
      </form>
    </section>
  );
}
