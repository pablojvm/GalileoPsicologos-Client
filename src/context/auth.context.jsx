import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [authenticateUser, setAuthenticateUser] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const authenticateUserFromToken = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setAuthenticateUser(null);
      setIsValidatingToken(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setAuthenticateUser(response.data.payload);
      setIsValidatingToken(false);
    } catch (error) {
      console.error("Token inválido:", error);
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setAuthenticateUser(null);
      setIsValidatingToken(false);
    }
  };

  useEffect(() => {
    authenticateUserFromToken();
  }, []);

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    setAuthenticateUser,
    setLoggedUserId,
    authenticateUserFromToken,
  };

  if (isValidatingToken) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
        <div className="loader mb-4"></div>
        <h3 className="text-blue-700 text-xl font-semibold animate-pulse">
          Validando usuario...
        </h3>
        <style>
          {`
            .loader {
              border: 6px solid #f3f3f3;
              border-top: 6px solid #3b82f6;
              border-radius: 50%;
              width: 60px;
              height: 60px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return <AuthContext.Provider value={passedContext}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthWrapper };
