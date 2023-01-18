import Character from "../components/Character.jsx";
import { useEffect, useState } from "react";
import { deleteCharacter, getCharacters } from "../services/characters.js";
// import Modal from "./Modal.jsx";
import Nav from '../components/Nav'
import "../App.css"

export default function Characters() {
    const [description, setDescription] = useState(false);
    const [character, setCharacter] = useState({});
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(0);
  
    useEffect(() => {
      apiCall();
    }, []);
  
    function apiCall() {
      fetch("https://superhero-api-production.up.railway.app/api/superheroes")
        .then((res) => res.json())
        .then((data) => setCharacters(data));
    }
  
    function display() {
      setDescription((prev) => !prev);
    }
  
    function handleClick(characterInfo) {
      setCharacter(characterInfo);
      display();
    //   handleModal();
    }
  
    function handleNextClick() {
      if (page + 16 < characters.length) {
        setPage((prev) => prev + 16);
      } else {
        setPage(0);
      }
    }
  
    function handlePrevClick() {
      if (page - 16 < characters.length) {
        setPage((prev) => prev - 16);
      } else {
        setPage(0);
      }
    }

    async function handleDelete() {
        await deleteCharacter(id);
        navigate("/characters", { replace: true });
      }

    async function fetchCharacters() {
        const allCharacters = await getCharacters();
        setCharacters(allCharacters);
      }
    // function handleModal(){
    //     if(description === 'modal-active'){
    //         setDescription('modal-inactive')
    //     }else{
    //         setDescription('modal-active')
    //     }
    // }

  return (
    <div>
        
      <div className="topButtons">
        <button className="nextButton" onClick={handleNextClick}>
          Next Page
        </button>
        <button className="prevButton" onClick={handlePrevClick}>
          Previous
        </button>
      </div>
      <div className="container">
        {characters?.slice(page, page + 16).map((character, index) => (
          <div
            className="Character-container"
            onClick={() => handleClick(character)}
            key={index}
          >
            <div className="Character-Name">
              <h3> {character.name} </h3>
            </div>
            <img className="image" src={character.images.sm} />
            {character.biography.alignment === "good" ? (
              <div className="good">
                <h2> {character.biography.alignment}</h2>
              </div>
            ) : (
              <div className="bad">
                <h2> {character.biography.alignment}</h2>
              </div>
            )}

<div className="powerstats">
              <ul> Intelligence- {character.powerstats.intelligence}</ul>
              <ul> Strength- {character.powerstats.strength}</ul>
              <ul> Speed- {character.powerstats.speed}</ul>
              <ul> Durability- {character.powerstats.durability}</ul>
              <ul> Power- {character.powerstats.power}</ul>
              <ul> Combat- {character.powerstats.combat}</ul>
            </div>

          </div>
        ))}
      </div>

      {description ? (
        <div className="modal">
          <div className="modal-content">
            <div className="appearance">
              <p>Gender- {character.appearance.gender}</p>
              <p>Race- {character.appearance.race}</p>
              <p>Height- {character.appearance.height}</p>
            </div>
            <p>Weight- {character.appearance.weight}</p>
            <p>Eye Color - {character.appearance.eyeColor}</p>
            <p>Hair Color - {character.appearance.hairColor}</p>
            <button onClick={display}>Close</button>
            <button onClick={handleDelete}>Destroy Character!</button>
          </div>
        </div>
      ) : null}

      <button className="nextButton" onClick={handleNextClick}>Next Page</button>
      <button className="prevButton" onClick={handlePrevClick}>Previous</button>
    </div>
  );

      }  











       {/* <div className="powerstats">
              <ul> Intelligence- {character.powerstats.intelligence}</ul>
              <ul> Strength- {character.powerstats.strength}</ul>
              <ul> Speed- {character.powerstats.speed}</ul>
              <ul> Durability- {character.powerstats.durability}</ul>
              <ul> Power- {character.powerstats.power}</ul>
              <ul> Combat- {character.powerstats.combat}</ul>
            </div>
          </div>
        ))}
        {/* <Modal description={description} handleModal={()=>{handleModal()}}  character={characters}/> */}
//       </div>
//       <div>
//       </div>

//       {description ? (
//         <div className="modal">
//           <div className="modal-content">
//             <div className="appearance">
//               <p>Gender- {character.appearance.gender}</p>
//               <p>Race- {character.appearance.race}</p>
//               <p>Height- {character.appearance.height}</p>
//             </div>
//             <p>Weight- {character.appearance.weight}</p>
//             <p>Eye Color - {character.appearance.eyeColor}</p>
//             <p>Hair Color - {character.appearance.hairColor}</p>
//             <button onClick={display}>Close</button>
//           </div>
//         </div>
//       ) : null}

//       <button className="nextButton" onClick={handleNextClick}>
//         Next Page
//       </button>
//       <button className="prevButton" onClick={handlePrevClick}>
//         Previous
//       </button>
//     </div>
//   ); */}

