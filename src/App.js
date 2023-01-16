import "./App.css";
import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";

function App() {
  const [description, setDescription] = useState(false);
  const [character, setCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(0)
  //const [backPage, setBackPage] = useState(page)

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

  function handlePrevClick(){
    if (page - 25 < characters.length){
      setPage(prev => prev - 25)
    }else{
      setPage(0)
    }
  }



  return (
    <div className="App">
      <Nav />
      <div className="container">
        {/* the question mark was added bc without it, the page was refreshing right after it shows up. the ? makes sure its reading the code "do this, before loading the rest of the data" */}
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
            <div className="alignment">
              <h2> {character.biography.alignment}</h2>
            </div>

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
          </div>
        </div>
      ) : null}
      <button className="nextButton" onClick={handleNextClick}>Next Page</button>
      <button className="prevButton" onClick={handlePrevClick}>Previous</button>
    </div>
  );
}

export default App;
