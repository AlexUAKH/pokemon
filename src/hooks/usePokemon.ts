import { useEffect, useState } from "react";

import { setTypes } from "../store/slices/pokemonSlice";
import { IPokemon } from "../types/pokemon";

import { useAppDispatch } from "./appDispatch";
import { useAxios } from "./useAxios";

export const usePokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const { response, error, loading } = useAxios({
    url: `/pokemon/${id}`,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (response) {
      const pokemon = transformPokemon(response);
      setPokemon(pokemon);
      const types = pokemon.types;
      dispatch(setTypes(types));
    }
  }, [response, dispatch]);

  return { pokemon, loading, error };
};

export const transformPokemon = (response: any) => {
  const abilities = response.abilities.map(
    (ability: any) => ability.ability.name
  );
  const forms = response.forms.map((form: any) => form.name);
  const moves = response.moves.map((move: any) => move.move.name);
  const stats = response.stats.map((stat: any) => ({
    name: stat.stat.name,
    stat: stat.base_stat,
    effort: stat.effort,
  }));
  const types = response.types.map((type: any) => type.type.name);

  return {
    abilities,
    base_experience: response.base_experience,
    forms,
    height: response.height,
    id: response.id,
    moves,
    name: response.name,
    species: response.species.name,
    sprites: response.sprites.front_default,
    stats,
    types,
    weight: response.weight,
  };
};
