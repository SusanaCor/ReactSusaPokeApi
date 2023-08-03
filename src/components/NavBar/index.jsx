import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import ".././NavBar/styles.css";
import { PokemonContext } from "../Contexto/PokemonContext";


const NavBar = () => {
  return (

    <div className="color">
    
      <Outlet />
    </div>
  );
};

export default NavBar;
