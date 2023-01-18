import React from 'react'
import { NavLink } from 'react-router-dom';


function Nav (){
    return(
        <nav>
        <div className='TitleName'>
            <h1> Superheros </h1>  
        </div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/characters">All Characters</NavLink>
      <NavLink to="/add-character">Add new Character!</NavLink>
    </nav>
    )
}


export default Nav
