import { ChangeEvent, FC } from "react";

import { useAppDispatch } from "../hooks/appDispatch";
import { useAppSelector } from "../hooks/appSelector";
import { getLimit, setLimit } from "../store/slices/pokemonSlice";

interface PageLimitProps {}

const PageLimit: FC<PageLimitProps> = () => {
  const value = useAppSelector(getLimit);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(e.target.value)));
  };

  return (
    <div className="page-limit">
      <div className="page-limit__label">Limit:</div>
      <select value={value} onChange={handleChange}>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
      </select>
    </div>
  );
};

export default PageLimit;
