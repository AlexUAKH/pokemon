import { FC } from "react";

import logo from "../assets/logo.png";

const Header: FC = () => {
  return (
    <header className="app__header header container">
      <div className="header__logo ibg">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
