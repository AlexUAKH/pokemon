import { FC } from "react";

export interface PokemonListItenProps {
  name: string;
  img: string;
  type: string;
}

const PokemonListItem: FC<PokemonListItenProps> = ({ img, name, type }) => {
  return (
    <div className="pokemons__list-item">
      <div className="pokemons__list-item-img ibg">
        <img src={img} alt="name" />
      </div>
      <div className="pokemons__list-item-name">
        <span>{name}</span>&nbsp;({type})
      </div>
    </div>
  );
};

export default PokemonListItem;
