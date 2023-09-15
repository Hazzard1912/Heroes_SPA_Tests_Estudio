import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/HeroCard";
import { getHeroesByName } from "../helpers/getHeroesByName";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Usamos query-string para ayudarnos a manejar lo que este
  // en los params.
  const { q = "" } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  // Auxiliares para aplicar style de manera condicional.
  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  // Las funciones suelen ir antes del renderizado.
  const onSearchSubmit = (event) => {
    event.preventDefault();

    if (searchText.trim() <= 1) return;

    // Note que cada que naveguemos a una nueva ruta, se leera el param q.
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <div className="col-7">
            <h4>Searching</h4>
            <hr />

            <form onSubmit={onSearchSubmit} aria-label="form">
              <input
                type="text"
                placeholder="Search a hero"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={onInputChange}
              />
              <button className="btn btn-outline-primary mt-1">Search</button>
            </form>
          </div>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {q === "" ? (
            <div className="alert alert-primary">Search a hero</div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger">
                No hero with <b>{q}</b>
              </div>
            )
          )} */}

          {/* Este codigo reemplaza el codigo dificil de leer de arriba. */}
          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
            aria-label="search-hero"
          >
            Search a hero
          </div>

          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
            aria-label="no-hero"
          >
            No hero with <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
