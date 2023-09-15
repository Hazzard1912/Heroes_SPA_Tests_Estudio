import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../helpers/getHeroById";
import { useMemo } from "react";

export const HeroPage = () => {
  // Leer informacion del url (menos query params):
  // sabemos que el params tiene la propiedad id, porque se la
  // establecimos en el archivo de routes.
  const { id } = useParams();

  /**
   * Recordemos algo, cuando tenemos funciones que llamamos en la
   * raiz de nuestro componente, estas son propensas a llamarse
   * cada vez que el componente sea redibujado (cosa que sucede
   * en los componentes de React cada que hay un cambio en el
   * estado).
   *
   * Por esta razon, es muy probable que ese comportamiento no
   * sea el que deseemos, y es buena practica usar el useMemo
   * para que nuestro componente memorice el resultado de esa
   * funcion y no la vuelva a ejecutar en cada renderizacion.
   */
  const hero = useMemo(() => getHeroById(id), [id]);

  const navigate = useNavigate();

  const onReturn = () => {
    // asi navegamos a la pagina anterior en el historial.
    navigate(-1);
  };

  // Validar si existe hero antes de crear el componente.
  if (!hero) {
    return <Navigate to="/marvel" />;
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/assets/heroes/${id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Alter ego:</strong> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <strong>Publisher:</strong> {hero.publisher}
          </li>
          <li className="list-group-item">
            <strong>First appearance:</strong> {hero.first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button className="btn btn-outline-primary" onClick={onReturn}>
          Back
        </button>
      </div>
    </div>
  );
};
