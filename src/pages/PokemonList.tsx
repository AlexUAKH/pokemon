import { FC, useEffect, useState } from "react";

import Loader from "../components/Loader";
import PokemonListItem from "../components/PokemonListIten";
import Search from "../components/Search";
import TypesFilter from "../components/TypesFilter";
import { useAppDispatch } from "../hooks/appDispatch";
import { useAppSelector } from "../hooks/appSelector";
import {
  fetchAllPokemons,
  getFilteredPokemons,
  getStatus,
} from "../store/slices/pokemonSlice";
import { EStatus, IPokemon } from "../types/pokemon";

interface PokemonListProps {}

const PokemonList: FC<PokemonListProps> = () => {
  const pokemonsList = useAppSelector(getFilteredPokemons);
  const status = useAppSelector(getStatus);
  const dispatch = useAppDispatch();
  const [pokemons, setPokemons] = useState<IPokemon[] | null>(null);
  const [loading, setLoadin] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getAndFilter = async () => {
      dispatch(fetchAllPokemons());
    };
    getAndFilter();
  }, [dispatch]);

  useEffect(() => {
    setLoadin(true);
    setError("");
    try {
      const pokemons: any = [];
      setPokemons(pokemons);
    } catch (e) {
      setError("Error happend");
    } finally {
      setLoadin(false);
    }
  }, [pokemonsList]);

  return (
    <section className="pokemons container">
      <TypesFilter />
      <Search />
      <div className="pokemons__list">
        {status === EStatus.LOADING && <Loader />}
        {status === EStatus.REJECTED && <h3>Something went wrong</h3>}

        {status !== EStatus.LOADING &&
          status !== EStatus.REJECTED &&
          pokemons &&
          pokemons.length > 0 &&
          pokemons.map((pokemon: any) => (
            <PokemonListItem
              name={pokemon.name}
              key={pokemon.name}
              img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png"
              type="pppoop"
            />
          ))}
        {status !== EStatus.LOADING && !pokemons && (
          <div>Can't find any creature</div>
        )}
      </div>
      {error && <div>Can't find any creature</div>}
      <button className="btn">{loading ? <Loader /> : "more"}</button>
    </section>
  );
};

export default PokemonList;
