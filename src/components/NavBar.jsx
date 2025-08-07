import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch, BsHouseDoorFill, BsFillPersonFill,
  BsFillCameraFill } from "react-icons/bs";

const NavBar = () => {
  return (
    <nav
      id="nav"
      className="flex justify-between items-center h-16 px-6 
                 fixed top-0 w-full z-40 
                 bg-white/90 dark:bg-[rgba(10,10,10,0.8)] backdrop-blur-lg 
                 border-b border-gray-200 dark:border-white/10 shadow-lg
                 text-gray-800 dark:text-gray-200 font-medium"
    >
  
      <Link to="/" className="text-xl font-bold">
        ReactGram
      </Link>

      <form id="search-form" className="relative w-[20%]">
        <BsSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full h-10 pl-10 pr-3 rounded-md
                     bg-gray-100 dark:bg-[#121212] 
                     border border-gray-300 dark:border-[#374151]
                     focus:outline-none focus:ring-2 focus:ring-[#833AB4]
                     text-sm transition"
        />
      </form>

  
      <ul id="nav-links" className="flex items-center gap-6">
        <li>
          <NavLink to="/" className="hover:text-[#833AB4] transition">
            <BsHouseDoorFill className="text-xl" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="hover:text-[#833AB4] transition">
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className="hover:text-[#833AB4] transition">
            Cadastrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
