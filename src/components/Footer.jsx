import React from "react";
import { HashLink as Link } from "react-router-hash-link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-4">Contacto</h3>
          <p>📍 Avenida de Salobreña 36, Motril</p>
          <p>📞 +34 696 633 362 / +34 616 833 939</p>
          <p>✉️ galileopsi@gmail.com / mvillarmoron@gmail.com</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <Link smooth to="/#services" className="hover:text-blue-300 transition">
                Servicios
              </Link>
            </li>
            <li>
              <Link smooth to="/sobreNosotros" className="hover:text-blue-300 transition">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link smooth to="/#contact" className="hover:text-blue-300 transition">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Síguenos</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://www.instagram.com/psimargru_galileopsi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/martavillarmoron/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-800 mt-8 pt-6 text-center text-gray-300 text-sm">
        © 2025 Galileo Psicólogos. Todos los derechos reservados.
      </div>
    </footer>
  );
}
