import { FC } from "react";

import logo from "../assets/logo.png";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="app__header header container">
      <div className="header__logo">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
