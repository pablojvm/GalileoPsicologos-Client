import { useContext } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { authenticateUser, setAuthenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthenticateUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold text-gray-700 flex items-center gap-2"
      >
        <img src="/logoMi.png" width="50" alt="Logo" />
        Galileo Psicólogos
      </Link>

      <ul className="flex gap-6 text-gray-700 items-center">
        <li>
          <Link
            smooth
            to="/#services"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Servicios
          </Link>
        </li>

        {/* Botón dinámico según rol */}
        {authenticateUser?.role === "patient" && (
          <li>
            <Link
              smooth
              to="/booking"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Reservar cita
            </Link>
          </li>
        )}

        {authenticateUser?.role === "psychologist" && (
          <li>
            <Link
              to="/dashboard"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              Agenda
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/sobreNosotros"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Sobre Nosotros
          </Link>
        </li>
        <li>
          <Link
            smooth
            to="/#contact"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Contacto
          </Link>
        </li>

        {/* Botón de logout para ambos roles */}
        {authenticateUser?.role && (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
