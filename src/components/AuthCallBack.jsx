// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/", { replace: true }); // Redirige a la página inicial
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <div>Autenticando...</div>;
}
