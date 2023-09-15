import { types } from "../../../src/auth/types/types";

describe("Pruebas en types", () => {
  test("should Debe de regresar estos types", () => {
    console.log(types);
    expect(types).toEqual({ login: "[Auth] Login", logout: "[Auth] Logout" });
  });
});
