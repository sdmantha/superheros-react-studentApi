// import './App.css';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Character({character}) {
  return (
    <div>
      <Link to={`/character/${character._id}`}>
        <h2>{character.name}</h2>
      </Link>
    </div>
  )
}








// function Character() {
//     return (
//       <div>
//         <nav>
//           <h1> Superheroes </h1>
//         </nav>
//       </div>
//     );
//   }
  
//   export default Character;