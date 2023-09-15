import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe("Pruebas en el authReducer", () => {
  test("Debe de retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("(login) Debe de llamar el login y autenticar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Jhonnier",
        id: 123,
      },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("(logout) Debe de borrar el name del usuario y logged en false", () => {
    const state = {
      logged: true,
      user: {
        id: 123,
        name: "Jhonnier",
      },
    };

    const action = {
      type: types.logout,
    };

    const newState = authReducer(state, action);

    expect(newState).toEqual({
      logged: false,
    });
  });
});
