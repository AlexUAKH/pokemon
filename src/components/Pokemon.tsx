import { FC } from "react";

import { IPokemon, IStatsItem } from "../types/pokemon";

import Bage from "./Bage";

interface PokemonProps {
  pokemon: IPokemon;
}

const Pokemon: FC<PokemonProps> = ({ pokemon }) => {
  return (
    <div className="pokemon__card">
      {pokemon.sprites && (
        <div className="pokemon__img ibg">
          <img src={pokemon.sprites} alt={pokemon.name} />
        </div>
      )}
      <p className="pokemon__name">{pokemon.name}</p>
      <p className="pokemon__title">Description:</p>

      <div className="pokemon__detailes">
        <div className="pokemon__row">
          <div className="pokemon__row-title">Base experience</div>
          <div className="pokemon__row-value">
            {pokemon.base_experience || "-"}
          </div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Abilities</div>
          <div className="pokemon__row-value">
            {pokemon.abilities &&
              pokemon.abilities.map((ability: string) => (
                <Bage title={ability} key={ability} />
              ))}
          </div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Height</div>
          <div className="pokemon__row-value">{pokemon.height}</div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Weight</div>
          <div className="pokemon__row-value">{pokemon.weight}</div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Forms</div>
          <div className="pokemon__row-value">{pokemon.forms}</div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Species</div>
          <div className="pokemon__row-value">{pokemon.species}</div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Types</div>
          <div className="pokemon__row-value">
            {pokemon.types &&
              pokemon.types.map((type: string) => (
                <Bage title={type} key={type} />
              ))}
          </div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Moves</div>
          <div className="pokemon__row-value pokemon__moves">
            {pokemon.moves &&
              pokemon.moves.map((move: string) => (
                <Bage title={move} key={move} />
              ))}
          </div>
        </div>

        <div className="pokemon__row">
          <div className="pokemon__row-title">Stats (base/efford)</div>
          <div className="pokemon__row-value pokemon__stats">
            {pokemon.stats.map((stat: IStatsItem) => (
              <Bage key={stat.name}>
                <div className="pokemon__stats-values">
                  <div>{stat.name}</div>
                  <div>
                    {stat.stat}/{stat.effort}
                  </div>
                </div>
              </Bage>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
