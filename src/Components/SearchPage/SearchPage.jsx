import React, { useState } from "react";
import api from "../../Services/api";

const SearchPage = () => {
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");

  const handleInput = (ev) => {
    setSearch(ev.target.value);
  };

  function handleSubmit(ev) {
    ev.preventDefault();
  }

  function searchUser() {
    api
      .get(`/users/${search}`)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops!" + err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Buscar usuário:
          <input type="search" name="search" onChange={handleInput} />
        </label>
        <input type="submit" value="Enviar" onClick={searchUser} />
      </form>
      <section className="userProfile">
        <img src={user.avatar_url} alt="" width='200px' height='200px' />
        <p>{user.name}</p>
        <p>{user.bio}</p>
        <p>{user.followers}</p>
        <p>{user.following}</p>
        <p>{user.email}</p>
        <p>{user.repos_url}</p>
      </section>
    </div>
  );
};

export default SearchPage;
