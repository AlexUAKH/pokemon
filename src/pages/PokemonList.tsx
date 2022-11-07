import { FC, useEffect, useMemo } from "react";

import Loader from "../components/Loader";
import PokemonListItem from "../components/PokemonListItem";
import Search from "../components/Search";
import TypesFilter from "../components/TypesFilter";
import { useAppDispatch } from "../hooks/appDispatch";
import { useAppSelector } from "../hooks/appSelector";
import {
  fetchPokemons,
  getPage,
  getPokemons,
  getSearchQuery,
  getStatus,
  nextPage,
  prevPage,
} from "../store/slices/pokemonSlice";
import { EStatus, IPokemonListItem } from "../types/pokemon";

interface PokemonListProps {}

const PokemonList: FC<PokemonListProps> = () => {
  const pokemons = useAppSelector(getPokemons);
  const status = useAppSelector(getStatus);
  const searchQuery = useAppSelector(getSearchQuery);
  const page = useAppSelector(getPage);

  const dispatch = useAppDispatch();

  const perPage = 6;
  const end = useMemo<number>(() => perPage * page, [page, perPage]);
  const start = useMemo<number>(() => perPage * (page - 1), [page, perPage]);

  const filteredList = useMemo<IPokemonListItem[]>(
    () => pokemons.filter((i) => i.name.includes(searchQuery.toLowerCase())),
    [searchQuery, pokemons]
  );
  const paginatedList = useMemo<IPokemonListItem[]>(
    () => filteredList.slice(start, end),
    [start, end, filteredList]
  );

  const isHaveNextPage = useMemo(
    () => filteredList.length > end,
    [end, filteredList]
  );

  useEffect(() => {
    const getAndFilter = async () => {
      dispatch(fetchPokemons());
    };
    getAndFilter();
  }, [dispatch]);

  return (
    <section className="pokemons container">
      <TypesFilter />
      <Search />
      <div className="pokemons__list">
        {status === EStatus.LOADING && <Loader />}
        {status === EStatus.REJECTED && <h3>Something went wrong</h3>}

        {status !== EStatus.LOADING &&
          status !== EStatus.REJECTED &&
          paginatedList.length > 0 &&
          paginatedList.map((pokemon: any) => (
            <PokemonListItem name={pokemon.name} key={pokemon.name} />
          ))}
        {status !== EStatus.LOADING && paginatedList.length === 0 && (
          <div>Can't find any creature</div>
        )}
      </div>
      <div className="pokemons__pagination">
        <button
          hidden={page === 1}
          onClick={() => dispatch(prevPage())}
          className="pokemons__prev btn"
        >
          Prev
        </button>
        <span></span>
        <button
          hidden={!isHaveNextPage}
          onClick={() => dispatch(nextPage())}
          className="pokemons__next btn"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default PokemonList;
