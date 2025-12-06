import { useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function AuthCallback() {
  const { verifyToken } = useContext(AuthContext);

  useEffect(() => {
    // Leer token del hash
    const hash = window.location.hash;
    const token = hash.replace("#token=", "");

    if (token) {
      localStorage.setItem("authToken", token);

      // 🔥 FORZAR actualización del context
      verifyToken();
    }

    // Redirigir donde quieras
    window.location.href = "/";
  }, []);

  return <div>Procesando autenticación...</div>;
}
