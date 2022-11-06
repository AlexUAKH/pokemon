import { ChangeEvent, FC } from "react";

import { useAppDispatch } from "../hooks/appDispatch";
import { useAppSelector } from "../hooks/appSelector";
import { getSearchQuery, setSearchQuery } from "../store/slices/pokemonSlice";

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(getSearchQuery);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(e.target.value));
  };
  const clear = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="search">
      <div className="search__input">
        <input
          className=""
          type="text"
          onChange={handleChange}
          value={searchQuery}
        />
        {searchQuery && (
          <button className="search__reset" onClick={clear}>
            <span></span>
          </button>
        )}
      </div>
      <button className="search__search btn" disabled={searchQuery === ""}>
        search
      </button>
    </div>
  );
};

export default Search;
