import { FC } from "react";

import Loader from "./Loader";

const FullScreenLoader: FC = () => {
  return (
    <div className="fullLoader">
      <Loader />
      {/* <div className="fullLoader__spinner">
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </div>
  );
};

export default FullScreenLoader;
