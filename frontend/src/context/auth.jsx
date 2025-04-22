import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  isLogged: false,
  handleLogin: () => {},
});
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = async (token) => {
    const payload = jwtDecode(token);
    if (Date.now() <= payload.exp * 1000) {
      localStorage.setItem("accessToken", token);
      setUser({ _id: payload._id, email: payload.email });
      setIsLogged(true);
    } else {
      setIsLogged(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      handleLogin(accessToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLogged, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
