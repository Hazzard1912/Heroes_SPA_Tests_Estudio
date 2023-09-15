import PropType from "prop-types";
import { Link } from "react-router-dom";

const CharactersByHero = ({ alter_ego, characters }) =>
  alter_ego === characters ? <></> : <p>{characters}</p>;

export const HeroCard = ({
  id,
  superhero,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroImageUrl = `/assets/heroes/${id}.jpg`;
  // const characterByHero = <p>{characters}</p>;

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} alt={superhero} className="card-img" />
          </div>

          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              {/* {alter_ego !== characters && characterByHero} */}
              <CharactersByHero characters={characters} alter_ego={alter_ego} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              {/* Necesitamos crear rutas de manera dinamica. */}
              <Link to={`/hero/${id}`}>Mas...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroCard.propTypes = {
  id: PropType.string.isRequired,
  superhero: PropType.string.isRequired,
  alter_ego: PropType.string.isRequired,
  first_appearance: PropType.string.isRequired,
  characters: PropType.string.isRequired,
};
