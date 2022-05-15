import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"

const Home = () => {
  return (
    <main>
      <h2>Sirius Hub</h2>
      <p>Busque repositórios de desenvolvedores de maneira simples e ágil</p>
      <Link to={"/Search"}>
          <Button
            text={'Acessar página de busca'}
          />
      </Link>
    </main>
  );
};

export default Home;
