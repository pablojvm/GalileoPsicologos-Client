import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

export default function PsychologistDashboard() {
  const { loggedUserId } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
  const fetchMySchedule = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/appointment/my-schedule`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await res.json();
      console.log("Mis citas:", data);
    } catch (err) {
      console.error("Error cargando agenda:", err);
    }
  };

  fetchMySchedule();
}, []);


  return (
    <section className="py-10 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mi Agenda</h1>
      {appointments.length === 0 ? (
        <p>No tienes citas programadas.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((app) => (
            <div key={app._id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p>
                  <span className="font-semibold">Paciente:</span> {app.patient.name}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span> {new Date(app.date).toLocaleString()}
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
