import React, { useState } from "react";
import api from "../../Services/api";
import Sort from "../Sort/Sort";
import Modal from "../Modal/Modal";
import styles from "./RepoList.module.css";
import Button from "../Button/Button";

import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const RepoList = (props) => {
  const repoList = props.data;
  const [repoDetails, setRepoDetails] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  function showRepoDetails(repoName) {
    api
      .get(`/repos/${repoName}`)
      .then((response) => setRepoDetails(response.data))
      .catch((err) => {
        console.error("ops!" + err);
      });
    setShowDetails(true);
  }

  const SortButton = ({ direction, id, onClick, sortBy }) => {
    const arrows = { ascending: <FaSortDown />, descending: <FaSortUp /> };
    const arrow = sortBy === id ? arrows[direction] : <FaSort />;

    return (
      <span id={id} onClick={onClick}>
        {arrow}
      </span>
    );
  };

  const { items, requestSort, sortConfig } = Sort(repoList, {
    direction: "descending",
    key: "stargazers_count",
  });

  return (
    <div className={styles.main}>
      <table>
        <thead>
          <tr>
            <th>
              Nome{" "}
              <SortButton
                direction={sortConfig?.direction}
                id="name"
                onClick={() => requestSort("name")}
                sortBy={sortConfig?.key}
              />
            </th>
            <th>
              Estrelas{" "}
              <SortButton
                direction={sortConfig?.direction}
                id="stargazers_count"
                onClick={() => requestSort("stargazers_count")}
                sortBy={sortConfig?.key}
              />
            </th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.stargazers_count}</td>
              <td>
                <Button
                  text={"Ver"}
                  onClick={() => showRepoDetails(repo.full_name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        text={`Nome: ${repoDetails.full_name}`}
        onClose={() => setShowDetails(false)}
        show={showDetails}
      >
        <span className={styles.details}>
          Descrição:
          {` ${
            repoDetails.description === null
              ? " Não disponivel"
              : repoDetails.description
          }`}
        </span>
        <span className={styles.details}>
          Linguagem:{` ${repoDetails.language}`}
        </span>
        <span className={styles.details}>
          Estrelas:{` ${repoDetails.stargazers_count}`}
        </span>
        <a href={repoDetails.html_url} target="blank">
          <Button text={"Acessar repositório"} />
        </a>
      </Modal>
    </div>
  );
};

export default RepoList;
