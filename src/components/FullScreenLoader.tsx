import { FC } from "react";

const FullScreenLoader: FC = () => {
  return (
    <div className="fullLoader">
      <div className="fullLoader__spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
