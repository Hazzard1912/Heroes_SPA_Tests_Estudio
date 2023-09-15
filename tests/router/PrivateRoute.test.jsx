import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en PrivateRoute", () => {
  test("Debe de mostrar el children si esta autenticado", () => {
    /**
     * Esta es la forma en la cual podemos evaluar el localStorage
     * Como este componente usa el setItem, ese es el que
     * usamos para hacer los asserts
     */

    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 123,
        name: "test",
      },
    };

    /**
     *  useLocation() may be used only in the context of
     *  a <Router> component.
     *
     * Este error lo solucionamos al envolver el componente en
     * un MemoryRouter.
     *
     * MemoryRouter es una implementación de React Router que
     * se utiliza en entornos sin un navegador real, como
     * en pruebas unitarias o en aplicaciones que se ejecutan
     * en entornos de servidor donde no hay un navegador
     * real para manejar la navegación. Al usar MemoryRouter,
     * puedes simular rutas y navegación en estos entornos y,
     * al mismo tiempo, permitir que los componentes accedan a
     * las funciones y hooks de React Router, como useLocation
     * (), sin generar errores
     */

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
  });
});
