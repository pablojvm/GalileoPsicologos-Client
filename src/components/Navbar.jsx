import { useContext, useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { authenticateUser, setAuthenticateUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/token=([^&]+)/);

    if (match) {
      const token = match[1];
      localStorage.setItem("authToken", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAuthenticateUser(payload);
      window.history.replaceState(null, "", "/");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthenticateUser(null);
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <Link
            to="/"
            className="text-xl font-bold text-gray-700 flex items-center gap-2"
          >
            <img src="/logoMi.png" width="50" alt="Logo" />
            Galileo Psicólogos
          </Link>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-500 transition"
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <ul className="hidden sm:flex gap-6 items-center text-gray-700">
            <li>
              <Link smooth to="/#services" className="hover:text-blue-500 transition">
                Servicios
              </Link>
            </li>

            {authenticateUser?.role === "patient" && (
              <li>
                <Link smooth to="/booking" className="hover:text-blue-500 transition">
                  Reservar cita
                </Link>
              </li>
            )}

            {authenticateUser?.role === "psychologist" && (
              <li>
                <Link to="/dashboard" className="hover:text-blue-500 transition">
                  Agenda
                </Link>
              </li>
            )}

            <li>
              <Link to="/sobreNosotros" className="hover:text-blue-500 transition">
                Sobre Nosotros
              </Link>
            </li>

            <li>
              <Link smooth to="/#contact" className="hover:text-blue-500 transition">
                Contacto
              </Link>
            </li>

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
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white shadow-lg">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            <li>
              <Link
                smooth
                to="/#services"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
              >
                Servicios
              </Link>
            </li>

            {authenticateUser?.role === "patient" && (
              <li>
                <Link
                  smooth
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                >
                  Reservar cita
                </Link>
              </li>
            )}

            {authenticateUser?.role === "psychologist" && (
              <li>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                >
                  Agenda
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/sobreNosotros"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
              >
                Sobre Nosotros
              </Link>
            </li>

            <li>
              <Link
                smooth
                to="/#contact"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
              >
                Contacto
              </Link>
            </li>

            {authenticateUser?.role && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
