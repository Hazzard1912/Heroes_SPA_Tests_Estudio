import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en el AppRouter", () => {
  test("Debe de mostrar el login si no esta atuenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("Debe de mostrar el componente de marvel si esta autenticado", () => {
    const contextValue = {
      logged: true,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    screen.debug();
    expect(screen.getByText("Marvel Comics")).toBeTruthy();
  });
});
