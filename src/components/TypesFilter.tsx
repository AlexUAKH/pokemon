import { FC } from "react";

import { useAppDispatch } from "../hooks/appDispatch";
import { useAppSelector } from "../hooks/appSelector";
import {
  addType,
  delType,
  getTypes,
  selectedType,
} from "../store/slices/pokemonSlice";

import TypesFilterItem from "./TypesFilterItem";

interface TypesFilterProps {}

const TypesFilter: FC<TypesFilterProps> = () => {
  const types = useAppSelector(getTypes);
  const activeType = useAppSelector(selectedType);
  const dispatch = useAppDispatch();

  const handleTypeCheck = (type: string) => {
    if (activeType === type) {
      dispatch(delType());
    } else {
      dispatch(addType(type));
    }
  };

  return (
    <nav className="type-filter">
      Types:
      {types &&
        types.map((type: string) => (
          <TypesFilterItem
            key={type}
            name={type}
            check={handleTypeCheck}
            active={activeType === type}
          />
        ))}
    </nav>
  );
};

export default TypesFilter;
