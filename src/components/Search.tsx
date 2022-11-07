import { ChangeEvent, FC, KeyboardEvent, useState } from "react";

import { useAppDispatch } from "../hooks/appDispatch";
import { setSearchQuery } from "../store/slices/pokemonSlice";

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
    if (e.target.value === "") clear();
  };
  const clear = () => {
    setQuery("");
    dispatch(setSearchQuery(""));
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") search();
  };

  const search = () => {
    dispatch(setSearchQuery(query));
  };

  return (
    <div className="search">
      <div className="search__input">
        <input
          className=""
          type="text"
          onChange={handleChange}
          onKeyDown={handleEnter}
          value={query}
        />
        {query && (
          <button className="search__reset" onClick={clear}>
            <span></span>
          </button>
        )}
      </div>
      <button
        onClick={search}
        className="search__search btn"
        disabled={query === ""}
      >
        search
      </button>
    </div>
  );
};

export default Search;
