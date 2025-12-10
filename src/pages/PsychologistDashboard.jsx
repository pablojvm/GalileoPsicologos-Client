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
      console.log("Mis citas:", res.data);

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
        return "bg-yellow-100 text-yellow-800";
      case "confirmada":
        return "bg-green-100 text-green-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="pt-32 pb-12 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Mi Agenda
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          No tienes citas programadas.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {appointments.map((app) => (
            <div
              key={app._id}
              className="p-6 border rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="mb-4">
                <p className="text-gray-800 font-semibold mb-1">
                  Paciente: <span className="font-normal">{app.patient.username}</span>
                </p>
                <p className="text-gray-800 font-semibold mb-1">
                  Fecha:{" "}
                  <span className="font-normal">{app.date}-{app.time}</span>
                </p>
                <p className="text-gray-800 font-semibold mb-1">
                  Servicio: <span className="font-normal">{app.service}</span>
                </p>
              </div>

              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PsychologistDashboard