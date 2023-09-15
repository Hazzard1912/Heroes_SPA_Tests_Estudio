import { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);

  // Usemos useLocation para recordar la ultima pagina visitada
  const { pathname, search } = useLocation();

  const lastPath = pathname + search;
  
  // Esto lo usamos en el componente LoginPage
  localStorage.setItem("lastPath", lastPath);

  return logged ? children : <Navigate to="/login" />;
};
