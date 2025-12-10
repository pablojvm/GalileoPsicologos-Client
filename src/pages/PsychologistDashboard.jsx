import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

function PsychologistDashboard() {
  const { loggedUserId } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    mySchedule();
  }, []);

  const mySchedule = async () => {
    try {
      const res = await service.get("/appointment/my-schedule");

      const now = new Date();
      const upcoming = res.data.filter(app => new Date(app.date) >= now);
      setAppointments(upcoming);
    } catch (err) {
      console.error("Error cargando agenda:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pendiente":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmada":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "rechazada":
      case "cancelada":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const actualizarEstadoCita = async (id, nuevoEstado) => {
    try {
      await service.patch(`/appointment/${id}`, { status: nuevoEstado });

      setAppointments(prev =>
        prev.map(app =>
          app._id === id ? { ...app, status: nuevoEstado } : app
        )
      );
      alert(`Cita ${nuevoEstado} correctamente`);
    } catch (err) {
      console.error("Error actualizando estado:", err);
      alert("No se pudo actualizar el estado de la cita");
    }
  };

  return (
    <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Mi Agenda
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No tienes citas programadas.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((app) => (
            <div
              key={app._id}
              className="p-6 bg-white border rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between"
            >
              <div className="mb-4 space-y-2">
                <p className="text-gray-700 font-semibold">
                  Paciente: <span className="font-normal">{app.patient.username}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Fecha: <span className="font-normal">{app.date} - {app.time}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Servicio: <span className="font-normal">{app.service}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span
                  className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>

                {/* Botones Aceptar/Rechazar solo si está pendiente */}
                {["pendiente", "pending"].includes(app.status.toLowerCase()) && (
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => actualizarEstadoCita(app._id, "confirmed")}
                      className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition font-semibold"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => actualizarEstadoCita(app._id, "cancelled")}
                      className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition font-semibold"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PsychologistDashboard;
