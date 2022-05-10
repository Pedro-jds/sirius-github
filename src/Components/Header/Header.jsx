import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
        <Link className='logo' to={"/"}/>
        <Link to={"/"}>Home</Link>
        <Link to={"/Search"}>Busca</Link>
    </nav>
  )
}

export default Header