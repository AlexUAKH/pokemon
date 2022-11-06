import { FC, useEffect } from "react";

import Search from "../components/Search";
import TypesFilter from "../components/TypesFilter";
import { useAppDispatch } from "../hooks/appDispatch";
import { useAppSelector } from "../hooks/appSelector";
import {
  fetchAllPokemons,
  selectAllPokemons,
} from "../store/slices/pokemonSlice";

interface PokemonListProps {}

const PokemonList: FC<PokemonListProps> = () => {
  const pokemons = useAppSelector(selectAllPokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAll = () => {
      dispatch(fetchAllPokemons());
    };
    // getAll();
  }, [dispatch]);

  return (
    <section className="pokemons container">
      <TypesFilter />
      <Search />
      <div className="pokemons__list">
        {pokemons.length > 0 &&
          pokemons.map((pokemon: any) => (
            <div className="" key={pokemon.name}>
              <div className="">{pokemon.name}</div>
              <div className="">{pokemon.url}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PokemonList;
