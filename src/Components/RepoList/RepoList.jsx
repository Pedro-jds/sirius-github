import React, { useState } from "react";
import api from "../../Services/api";
import Sort from "../Sort/Sort";
import Modal from "../Modal/Modal";

const RepoList = (props) => {
  const [repoList, setRepoList] = useState(props.data);
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
    console.log(repoDetails);
  }

  const SortButton = ({ direction, id, onClick, sortBy }) => {
    const arrows = { ascending: "🔽", descending: "🔼" };
    const arrow = sortBy === id ? arrows[direction] : "↕︎";

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
    <div>
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
              <th>{repo.name}</th>
              <th>{repo.stargazers_count}</th>
              <th>
                <button
                  type="button"
                  onClick={() => showRepoDetails(repo.full_name)}
                >
                  Mostrar
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        text={`Nome: ${repoDetails.full_name}`}
        onClose={() => setShowDetails(false)}
        show={showDetails}
      >
        <p>
          Descrição:
          {` ${repoDetails.description === null
            ? " Não disponivel"
            : repoDetails.description}`}
        </p>
        <p>Linguagem:{` ${repoDetails.language}`}</p>
        <p>Estrelas:{` ${repoDetails.stargazers_count}`}</p>
        <a href={repoDetails.html_url} target="blank">
          Acessar repositorio
        </a>
      </Modal>
    </div>
  );
};

export default RepoList;
