import React from "react";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

const NavBar = () => {
  return (
    <nav
      id="nav"
      className="flex justify-between items-center bg-[#000] border-b border-[#363636] py-[.1em] px-[1em]"
    >
      <Link to="/">ReactGram</Link>
      <form id="search-form" className="relative w-[20%]">
        <BsSearch className="absolute top-[10px] left-[9px]" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="pl-10 border-0 rounded-md w-full m-0"
        />
      </form>
      <ul id="nav-links" className="flex items-center">
        <li className="mr-[1em]">
          <NavLink to="/">
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li className="mr-[1em]">
          <NavLink to="/login">Entrar</NavLink>
        </li>
        <li className="mr-[1em]">
          <NavLink to="/register">Cadastrar</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
