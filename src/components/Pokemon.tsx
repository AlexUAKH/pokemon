import { FC } from "react";

import { IPokemon } from "../types/pokemon";

interface PokemonProps {
  pokemon: IPokemon;
}

const Pokemon: FC<PokemonProps> = ({ pokemon }) => {
  return (
    <div className="pokemon__card">
      <div className="pokemon__img">
        <img src="" alt="" />
      </div>
      <div className="pokemon__detailes">
        <div className="pokemon__row">
          <div className="pokemon_row-title">Name</div>
          <div className="pokemon__row-value">{pokemon.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
