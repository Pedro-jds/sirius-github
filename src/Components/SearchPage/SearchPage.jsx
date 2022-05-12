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
    console.log(user);
  }

  function showRepo() {
    setUser(null)
    api
      .get(`/users/${search}/repos`)
      .then((response) => setRepoList(response.data))
      .catch((err) => {
        console.error("ops!" + err);
      });
    console.log(repoList);
  }

  return (
    <div>
      <form className={styles.formSearch} onSubmit={handleSubmit}>
        <label>
          Buscar usuário:
          <input type="search" name="search" onChange={handleInput} />
        </label>
        <input type="submit" value="Enviar" onClick={searchUser} />
      </form>
      {!user ? null : (
        <div className={styles.userProfile}>
          <img src={user.avatar_url} alt="" width="200px" height="200px" />
          <p>{user.name}</p>
          <p>Bio:{user.bio === null ? " Não disponivel" : user.bio}</p>
          <p>Seguidores:{user.followers}</p>
          <p>Seguindo:{user.following}</p>
          <p>Email:{user.email === null ? " Não disponivel" : user.email}</p>
          {user.public_repos===0? 'Este usuário não tem repositorios publicos':<button onClick={showRepo}>Ver repositorios...</button>}
        </div>
      )}
      {repoList[0] === undefined ? null : (
      <RepoList data={repoList}/>)}
    </div>
  );
};

export default SearchPage;
