import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";

function Booking() {
  const { loggedUserId, setLoggedUserId } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [psychologists, setPsychologists] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const navigate = useNavigate();

  const holidays = [
    "2026-01-01",
    "2026-01-06",
    "2026-03-19",
    "2026-05-01",
    "2026-08-15",
    "2026-10-12",
    "2026-11-01",
    "2026-12-06",
    "2026-12-08",
    "2026-12-25",
    "2025-12-25",
  ].map((d) => new Date(d));

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

  const cargarHorasOcupadas = async () => {
    if (!formData.fecha || !formData.psicologo) return;

    try {
      const fecha = formData.fecha;
      const fechaStr = `${fecha.getFullYear()}/${String(
        fecha.getMonth() + 1
      ).padStart(2, "0")}/${String(fecha.getDate()).padStart(2, "0")}`;

      const res = await service.get(
        `/appointment/availability?psychologist=${formData.psicologo}&date=${fechaStr}`
      );

      setHorasOcupadas(res.data);
      setHoraSeleccionada(null);
    } catch (err) {
      console.error("Error cargando disponibilidad:", err);
    }
  };

  useEffect(() => {
    cargarHorasOcupadas();
  }, [formData.psicologo, formData.fecha]);

  const obtenerHorasDisponibles = (fecha) => {
    if (!fecha) return [];
    const day = fecha.getDay();
    let bloques = [];

    if (day >= 1 && day <= 4)
      bloques = [
        [10, 14],
        [17, 20],
      ];
    else if (day === 5 || day === 6) bloques = [[10, 13]];

    const horas = [];

    bloques.forEach(([inicio, fin]) => {
      for (let h = inicio; h < fin; h++) {
        horas.push(`${String(h).padStart(2, "0")}:00`);
        horas.push(`${String(h).padStart(2, "0")}:30`);
      }
    });

    const horasFiltradas = horas.filter((hora) => {
      const [hh, mm] = hora.split(":").map(Number);

      const bloque = bloques.find(([inicio, fin]) => hh >= inicio && hh < fin);
      if (!bloque) return true;

      const [inicio, fin] = bloque;

      if (hh === fin - 1 && mm === 30) return false;

      return true;
    });

    return horasFiltradas;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!horaSeleccionada) return alert("Debes seleccionar una hora");
    if (!formData.fecha) return alert("Debes seleccionar una fecha");

    const fecha = formData.fecha;
    const fechaFormateada = `${fecha.getFullYear()}/${String(
      fecha.getMonth() + 1
    ).padStart(2, "0")}/${String(fecha.getDate()).padStart(2, "0")}`;

    try {
      await service.post("/appointment", {
        psychologist: formData.psicologo,
        patient: loggedUserId,
        service: formData.service,
        date: fechaFormateada,
        time: horaSeleccionada,
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
                {psico.username}
              </option>
            ))}
          </select>
        </label>

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
            <option value="Terapia adulto">Adultos</option>
            <option value="Terapia de pareja">Parejas</option>
            <option value="Terapia adolescente">Adolescentes</option>
            <option value="Terapia niño">Niños</option>
            <option value="Altas capacidades">Altas capacidades</option>
            <option value="Terapia online">Online</option>
          </select>
        </label>

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
              filterDate={(date) => {
                const day = date.getDay();
                const isSunday = day === 0;
                const isHoliday = holidays.some(
                  (h) => h.toDateString() === date.toDateString()
                );
                return !isSunday && !isHoliday;
              }}
            />
          </label>

          <label className="flex flex-col flex-1">
            Hora
            <div className="grid grid-cols-4 gap-2 mt-2">
              {!formData.fecha && (
                <div className="col-span-4 text-center text-gray-500 py-4">
                  Selecciona una fecha para ver las horas disponibles
                </div>
              )}

              {formData.fecha &&
                obtenerHorasDisponibles(formData.fecha).map((hora) => {
                  const [hh, mm] = hora.split(":").map(Number);

                  const ocupada = horasOcupadas.some((ocupadaHora) => {
                    const [h, m] = ocupadaHora.split(":").map(Number);
                    const ocupadaMin = h * 60 + m;
                    const horaMin = hh * 60 + mm;
                    return (
                      horaMin === ocupadaMin || horaMin === ocupadaMin + 30
                    );
                  });

                  const ahora = new Date();
                  let horaPasada = false;
                  const fechaSeleccionada = new Date(formData.fecha);

                  if (
                    fechaSeleccionada.toDateString() === ahora.toDateString() &&
                    (hh < ahora.getHours() ||
                      (hh === ahora.getHours() && mm <= ahora.getMinutes()))
                  ) {
                    horaPasada = true;
                  }

                  const deshabilitada = ocupada || horaPasada;
                  const seleccionada = hora === horaSeleccionada;

                  return (
                    <button
                      key={hora}
                      type="button"
                      disabled={deshabilitada}
                      onClick={() => setHoraSeleccionada(hora)}
                      className={`
                        py-2 rounded-lg font-semibold transition
                        ${
                          deshabilitada
                            ? "bg-gray-300 cursor-not-allowed line-through"
                            : ""
                        }
                        ${
                          seleccionada
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }
                      `}
                    >
                      {hora}
                    </button>
                  );
                })}
            </div>
          </label>
        </div>

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

export default Booking;
