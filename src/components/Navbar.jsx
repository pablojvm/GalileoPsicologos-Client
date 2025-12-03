import { HashLink as Link } from "react-router-hash-link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold text-gray-700 flex items-center gap-2"
      >
        <img src="/logoMi.png" width="50" alt="Logo" />
        Galileo Psicólogos
      </Link>
      <ul className="flex gap-6 text-gray-700">
        <li>
          <Link
            smooth
            to="/#services"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Servicios
          </Link>
        </li>
        <li>
          <Link
            smooth
            to="/booking"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Reservar cita
          </Link>
        </li>
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
      </ul>
    </nav>
  );
}
