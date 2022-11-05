import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="app__footer footer container">
      <div>@{new Date().getFullYear()}</div>
      <div>-</div>
      <strong>
        <a
          href="https://github.com/AlexUAKH/pokemon"
          target="_blank"
          rel="noreferrer"
        >
          AlexKHUA
        </a>
      </strong>
    </footer>
  );
};

export default Footer;
