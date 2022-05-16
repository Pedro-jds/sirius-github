import React, { useState } from "react";
import api from "../../Services/api";
import styles from "./SearchPage.module.css";
import RepoList from "../RepoList/RepoList";

const SearchPage = () => {
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [repoList, setRepoList] = useState([]);

  const handleInput = (ev) => {
    setSearch(ev.target.value);
  };

  function handleSubmit(ev) {
    ev.preventDefault();
  }

  function searchUser() {
    setRepoList([]);
    api
      .get(`/users/${search}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        setUser(null);
        alert("Usuário não encontrado");
        console.error("ops!" + err);
      });
  }

  function showRepo() {
    setUser(null);
    api
      .get(`/users/${search}/repos`)
      .then((response) => setRepoList(response.data))

      .catch((err) => {
        console.error("ops!" + err);
      });
  }

  return (
    <div className={styles.main}>
      <div className={styles.formSearch} onSubmit={handleSubmit}>
        <label>
          <input
            type="search"
            name="search"
            onChange={handleInput}
            placeholder="Buscar usuário..."
          />
        </label>
        <input
          type="submit"
          className="searchIcon"
          value={"Buscar"}
          onClick={searchUser}
        />
      </div>
      {!user ? null : (
        <div className={styles.userProfile}>
          <img src={user.avatar_url} alt="" width="150px" height="150px" />
          <span>Nome:{` ${user.name}`}</span>
          <span>
            Bio:{user.bio === null ? " Não disponível" : ` ${user.bio}`}
          </span>
          <span>Seguidores:{` ${user.followers}`}</span>
          <span>Seguindo:{` ${user.following}`}</span>
          <span>
            Email:{user.email === null ? " Não disponível" : ` ${user.email}`}
          </span>
          {user.public_repos === 0 ? (
            <span>'Este usuário não tem repositórios públicos'</span>
          ) : (
            <button onClick={showRepo}>Ver repositórios...</button>
          )}
        </div>
      )}
      {repoList[0] === undefined ? null : <RepoList data={repoList} />}
    </div>
  );
};

export default SearchPage;
