import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from "../../../src/ui";

/**
 * Ok, lo que tenemos que hacer ahora es mockear la libreria
 * react-router-dom, pero solo lo que queremos, que es el
 * useNavigate.
 *
 * Entonces hacemos algo interesante y es que al hacer el mock
 * de toda la libreria, estariamos diciendo que vamos a
 * sobreescribir el comportamiento de todas las funciones y
 * componententes en ella, es por eso que, como segundo argumento
 * usamos una funcion flecha para retornar, primero, con el
 * ...jest.requireActual, toda la libreria con su funcionamiento
 * normal, y luego, sobreescribimos el useNavigate a nuestra
 * funcion de jest.
 */

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en Navbar", () => {
  test("Debe de mostar el nombre de la persona logueada correctamente", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "test",
        id: 123,
      },
    };

    const {
      user: { name },
    } = contextValue;

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(name)).toBeTruthy();
  });

  test("Debe de llamar navigate cuando  se haga click en logout", () => {
    const contextValue = {
      logged: true,
      logout: jest.fn(),
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    screen.debug();
    expect(contextValue.logout).toHaveBeenCalled();

    /**
     * Ahora debemos hacer el mock de nuestra funcion navigate.
     */
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
  test("logout debe de haber sido llamado al dar click en logout", () => {});
});
