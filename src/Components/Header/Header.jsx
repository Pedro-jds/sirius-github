import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Link className={styles.brand} to={"/"}>
        Sirius Hub
      </Link>
      <nav>
        <Link className={styles.link} to={"/"}>
          Home
        </Link>
        <Link className={styles.link} to={"/Search"}>
          Busca
        </Link>
      </nav>
    </header>
  );
};

export default Header;
