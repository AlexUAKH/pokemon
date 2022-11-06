import { FC, useEffect, useState } from "react";

import { useAppDispatch } from "../hooks/appDispatch";
import { useAppSelector } from "../hooks/appSelector";
import { useAxios } from "../hooks/useAxios";
import { addType, delType, selectedTypes } from "../store/slices/pokemonSlice";

import TypesFilterItem from "./TypesFilterItem";

interface TypesFilterProps {}

const TypesFilter: FC<TypesFilterProps> = () => {
  const { response } = useAxios({ url: "/type" });
  const [types, setTypes] = useState<string[]>([]);
  const activeType = useAppSelector(selectedTypes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (response) {
      const types = response.results.map((res: any) => res.name);

      setTypes(types);
    }
  }, [response]);

  const handleTypeCheck = (type: string) => {
    if (activeType === type) {
      dispatch(delType());
    } else {
      dispatch(addType(type));
    }
  };

  return (
    <nav className="type-filter">
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
