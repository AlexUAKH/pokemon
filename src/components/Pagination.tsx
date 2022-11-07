import { FC } from "react";

import { useAppDispatch } from "../hooks/appDispatch";
import { nextPage, prevPage } from "../store/slices/pokemonSlice";

interface PaginationProps {
  isHaveNextPage: boolean;
  page: number;
}

const Pagination: FC<PaginationProps> = ({ isHaveNextPage, page }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="pagination">
      <button
        hidden={page === 1}
        onClick={() => dispatch(prevPage())}
        className="pagination__prev btn"
      >
        Prev
      </button>
      <span></span>
      <button
        hidden={!isHaveNextPage}
        onClick={() => dispatch(nextPage())}
        className="pagination__next btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
