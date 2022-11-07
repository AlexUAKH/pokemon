import { FC } from "react";

import Loader from "./Loader";

const FullScreenLoader: FC = () => {
  return (
    <div className="fullLoader">
      <Loader />
    </div>
  );
};

export default FullScreenLoader;
