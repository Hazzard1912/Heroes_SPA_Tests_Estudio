import { fireEvent, render, screen } from "@testing-library/react";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";
import { MemoryRouter, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en SearchPage", () => {
  // Es bueno hacer esto por si se tienen varias pruebas que
  // usan el mock.
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrarse correctamente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test("Debe de mostrar a Batman y el input con el valor del query string", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    /**
     * Probar que los queryparams se usan bien es sencillo en
     * Este ejemplo, ya que al renderizarse el componente
     * establecemos el value del input con el valor que tenga
     * el queryparam q.
     */

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("assets/heroes/dc-batman.jpg");

    const divSearch = screen.getByLabelText("search-hero");
    expect(divSearch.style.display).toBe("none");
  });

  test("Debe de mostrar un error si no se encuentra el hero", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=fakehero"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const divSearch = screen.getByLabelText("no-hero");
    expect(divSearch.style.display).not.toBe("none");

    expect(divSearch.innerHTML).toContain("fakehero");
  });

  test("Debe de llamar el navigate a la pantalla nueva", () => {
    /**
     * El componente usa navigate, y queremos hacer la prueba
     * sobre si es llamado y con que argumentos?
     *
     * Entonces debemos de mockear la funcion de la libreria.
     */

    const pruebaBusqueda = "wonder";

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");

    /**
     * Asi no se hace, recordar que el input esta amarrado
     * mediante el onChange al onInputChange del useForm,
     * y que el useForm espera el target que viene del evento
     * que se pasa como argumento desde el elemento html.
     */
    // input.value = prubaBusqueda;

    fireEvent.change(input, {
      target: { name: "searchText", value: pruebaBusqueda },
    });

    const form = screen.getByLabelText("form");
    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${pruebaBusqueda}`);
  });
});
