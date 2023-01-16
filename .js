import "./App.css";
//below, was imported to make sure we can use react
import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";

//below,create the app function so everything is inside of it
function App() {
  //below, can also be the toggle, but I named it descritption for the modal. The modal has the description of each character, it is set to false bc the description is not yet being shown
  const [description, setDescription] = useState(false);
  //character is used to name the characters
  const [character, setCharacter] = useState({});
  //below, characters was used to call each individual characters
  const [characters, setCharacters] = useState([]);
  //below, was made to set the first page of the app. And use for reference for the prev and next page
  const [page, setPage] = useState(0)
  

  //function created to call the api, diplays the description, handleClick so we can click the picture and the descritpion of each character shows up
  useEffect(() => {
    apiCall();
  }, []);

  // this calls the api information to show up
  function apiCall() {
    //this fetches the api from this link
    fetch("https://superhero-api-production.up.railway.app/api/superheroes")
    //below, this converts the api into json 
      .then((res) => res.json())
      //below,in the api all the information is in the data and not in another name
      .then((data) => setCharacters(data));
  }

  //below, this was created so he modal can set up (false into true)
  function display() {
    setDescription((prev) => !prev);
  }

  //below, this was created so you can click the character and the character info will show up with the modal
  function handleClick(characterInfo) {
    setCharacter(characterInfo);
    display();
  }

  //this was created to go the the next page. The page will start off with 16, and the next 'page' will add another 16 and has to be less than the characters.length (around 500 ish characters in total) and it will happen and the prev function is saying you will add the 16 to the prev number on the page. Else go back to the beginning of the page (if the number is greater that the total amount of characters and 16 cannot be added to it anymore than start from page 0 which is the first page)
  function handleNextClick(){
    if(page + 16 < characters.length){
      setPage(prev => prev + 16)
    } else {
      setPage(0)
    }
  }

  //below, the function is basically the same as the one ontop except you will take 16 away with the previous button
  function handlePrevClick(){
    if (page - 16 < characters.length){
      setPage(prev => prev - 16)
    }else{
      setPage(0)
    }
  }


//what we want to see returned after the functions are ran
  return (
    

    <div className="App">
        {/* below, we want to see the navv bar */}
      <Nav />
      {/* created a div for the  top buttons, so we can have next and previous buttons on the top and bottom  */}
      <div className="topButtons">
        {/* belowe, are the next and prev buttons for the page which both have an onClickand handleClick for when you click the buttons */}
      <button className="nextButton" onClick={handleNextClick}>Next Page</button>
      <button className="prevButton" onClick={handlePrevClick}>Previous</button>
      
    </div>
    {/* below, created a container to keep all the information of the characters in one box */}
      <div className="container">
        {/* below, the .map(to map through the whole array for the information)was created also a .slice (to show how many characters will show up on the page, slicing the numbers to show the 16) the props were added to this function because we want to grab this information when we map and slice through the array*/}
        {/* FYI-the question mark was added bc without it, the page was refreshing right after it shows up. the ? makes sure its reading the code "do this, before loading the rest of the data" */}
        {characters?.slice(page, page + 16).map((character, index) => (
          <div
            className="Character-container"
            onClick={() => handleClick(character)}
            key={index}
          >
            {/* This is all the stuff that will pop up in the front of the 'card' or the beginning of the modal */}
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
{/* the description is in a ternary operator for the modal, when the picture gets clicked on then all of this information will show up */}
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
        // below, if not clicked, then null(the action will not happen)
      ) : null}
{/* below, these buttons are created to go next and previous */}
      <button className="nextButton" onClick={handleNextClick}>Next Page</button>
      <button className="prevButton" onClick={handlePrevClick}>Previous</button>
    </div>
  );
}
// then you must make sure the App.js is exported
export default App;