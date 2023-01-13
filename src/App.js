import "./App.css";
import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";

function App() {
  const [description, setDescription] = useState(false);
  const [character, setCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(0)

  //function created to call the api, diplays the description, handleClick so we can click the picture and the descritpion of each character shows up
  useEffect(() => {
    apiCall();
  }, []);

  // this calls the api information to show up
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
  }

  function handleNextClick(){
    if(page + 25 < characters.length){
      setPage(prev => prev + 25)
    } else {
      setPage(0)
    }
  }

  console.log(characters);

  return (
    <div className="App">
      <Nav />
      <div className="container">
        {/* the question mark was added bc without it, the page was refreshing right after it shows up. the ? makes sure its reading the code "do this, before loading the rest of the data" */}
        {characters?.slice(page, page + 25).map((character, index) => (
          <div
            className="Character-container"
            onClick={() => handleClick(character)}
            key={index}
          >
            <div className="Character-Name">
              <h3> {character.name} </h3>
            </div>
            <img className="image" src={character.images.sm} />
            <div className="powerstats">
              <p> Intelligence- {character.powerstats.intelligence}</p>
              <p> Strength- {character.powerstats.strength}</p>
              <p> Speed- {character.powerstats.speed}</p>
              <p> Durability- {character.powerstats.durability}</p>
              <p> Power- {character.powerstats.power}</p>
              <p> Combat- {character.powerstats.combat}</p>
            </div>
          </div>
        ))}
      </div>
      {description ? (
        <div className="modal">
          <div className="modal-content">
            <h2 className="appearance">
              <p>Gender- {character.appearance.gender}</p>
              <p>Race- {character.appearance.race}</p>
              <p>Height- {character.appearance.height}</p>
            </h2>
            <p>Weight- {character.appearance.weight}</p>
            <p>Eye Color - {character.appearance.eyeColor}</p>
            <p>Hair Color - {character.appearance.hairColor}</p>
            <button onClick={display}>Close</button>
          </div>
        </div>
      ) : null}
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default App;
