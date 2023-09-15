import { render, screen } from "@testing-library/react";
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Pruebas en el PublicRoute", () => {
  test("Debe de mostrar el children si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    /**
     * Este componente, que solo funciona si recibe un contexto,
     * es decir, su funcionamiento depende de que exista un
     * contexto, no lo podemos renderizar asi nomas.
     *
     * Debemos entonces preparar el test dandole el contexto.
     */
    // render(<PublicRoute />);  });

    /**
     * De esta forma, envolvemos el PublicRoute en nuestro
     * AuthContext (recordar que los context por lo general
     * son Hihger Order Component, es decir, envuelven otros
     * componentes, esto con la finalidad de poder compartir
     * en este caso informacion a los componentes hijos.)
     * Y le damos el valor del contexto que queremos probar.
     *
     * Note que la unica funcion del componente PublicRoute es
     * la de permitir o no la renderizacion de los children.
     * Entiendase como children cualquier elemento html que se
     * encuentre envuelto en el componente.
     */
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta Publica</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta Publica")).toBeTruthy();
  });

  /**
   * Ahora debemos de probar que, si el usuario esta logueado
   * debe de navegar.
   */

  test("Debe de navegar si el usuario esta logueado", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "test",
        id: 123,
      },
    };

    /**
     * Aqui esta la explicacion.
     *
     * Tenemos el contexto que envuelve todo los elementos.
     *
     * Luego tenemos el MemoryRouter al cual le damos el
     * initialEntries de la pagina de login. Esa es la ruta
     * a la que estamos accediendo.
     *
     * Como estamos accediendo a esa ruta (en el virtual DOM),
     * debemos crear el Routes, y dentro de el crear cada Route.
     * Uno debe corresponder a login, y el otro a la pagina que
     * que redirecciona.
     *
     * Le damos un contenido simbolico para hacer la prueba, y
     * eso seria todo.
     *
     * el render entra por login, en las rutas encuentra el route
     * de login, cuyo elemento es el publicRoute. Como public
     * route depende del contexto, y estamos estableciendo un
     * contextValue con el logged en true, PublicRoute no va a
     * permitir la renderizacion de su children, sino va a
     * redirigir a "marvel".
     *
     * Por eso, ponemos otra Route con el path "marvel", y
     * esta tiene como elemento un h1. Esto si debe de
     * renderizarse, por lo cual lo podemos probar.
     */

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="marvel" element={<h1>Pagina Marvel</h1>} />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta Publica</h1>
                </PublicRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    screen.debug();

    expect(screen.getByText("Pagina Marvel")).toBeTruthy();
  });
});
