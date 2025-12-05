import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

export default function PsychologistDashboard() {
  const { loggedUserId } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
  mySchedule();
}, []);

const mySchedule = async () => {
  try {
    const res = await service.get("/appointment/my-schedule");
    console.log("Mis citas:", res.data);
    setAppointments(res.data);
  } catch (err) {
    console.error("Error cargando agenda:", err);
  }
};


  return (
    <section className="py-10 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mi Agenda</h1>
      {appointments.length === 0 ? (
        <p>No tienes citas programadas.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((app) => (
            <div
              key={app._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">Paciente:</span>{" "}
                  {app.patient.username}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span>{" "}
                  {new Date(app.date).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Servicio:</span> {app.service}
                </p>
                <p>
                  <span className="font-semibold">Estado:</span> {app.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
