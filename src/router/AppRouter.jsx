import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../auth";
import { HeroesRoutes } from "../heroes/routes/HeroesRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    // Implementando rutas privadas y publicas
    <>
      <Routes>
        {/* Implementemos las rutas publicas. */}
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        {/* <Route path="login" element={<LoginPage />} /> */}

        {/* Todas las rutas del HeroesRoutes compartiran algo
        del html (Navbar en este ejemplo), por eso las abstraemos en un solo archivo de rutas */}

        {/* Adicional a ello, aqui mostramos como lograr proteger rutas mediante el envolvimiento de las rutas HeroesRoutes en el Higher Order Component PrivateRoute, que permite la renderizacion de las rutas hijas si y solo si el logged del AuthContext es true */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
        />
        {/* <Route path="/*" element={<HeroesRoutes />} /> */}
      </Routes>
    </>
  );
};
