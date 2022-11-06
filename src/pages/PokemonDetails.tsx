import { FC } from "react";

import { useAxios } from "../hooks/useAxios";

interface PokemonDetailsProps {}

const PokemonDetails: FC<PokemonDetailsProps> = () => {
  const { response, error, loading } = useAxios({
    url: "/pokemon/50",
  });

  return <div className="pokemon container"></div>;
};

export default PokemonDetails;
