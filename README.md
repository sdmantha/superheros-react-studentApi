# Superheroes Card
### Github link:
#### 
### Netlify link:
####
### Api link:
#### https://superhero-api-production.up.railway.app/api/superheroes

---
### Requirements
-Build out a front end, using React, that interacts with and controls the data in the API someone built. 

-Include ways to perform full CRUD on the resource(s) of your API

Technical Requirements

-Runs without errors

-Be deployed to GitHub Pages, Netlify, or Surge



### Steps
---

    -First create repo on git hub
    -Go into folder where you want the repository
        - npx react-create-app nameOfWhateverYouWantTheFileToBeCalled
            --add the folowing from the github
              -git init
              -git add README.md
              -git commit   -m "first commit"
              -git branch -M main
              -git remote add origin https://github.com/username/superheros-react-studentApi.git
              -git push -u origin main
    -create Character.jsx in src
    -create Nav.jsx in src
    -remove the content in the App.js and App.css in the src
    -In App.js
        -import useEffect, and useState from 'react'; Nav from your Nav.jsx; and your css folder
        -create useEffect function
            -

```js
  useEffect(() => {
      apiCall();
      }, []);
  ```

        -create a function for the api( name it apiCall)
            -fetch the api
            -then return the props for each description you wan to add
            -make a .map for the characters and add an index so you dont get an error code
        -Now we want to add functioning buttons, so we can move a certain amount of items (characters) per page (need a prev and next handleClick, onClick and const)
            -const
        
```js
  const [page, setPage] = useState(0)
```
            -func for next and prev page
```js
function handleNextClick(){
    if(page + 16 < characters.length){
      setPage(prev => prev + 16)
    } else {
      setPage(0)
    }
  }

  function handlePrevClick(){
    if (page - 16 < characters.length){
      setPage(prev => prev - 16)
    }else{
      setPage(0)
    }
  }
```
        -create modal function for the desription (you need to create a character and characters const as well becasue they will be what needs to be clicked so the information shows up in a modal )
            -const (these const will be in the main function of App)
```js
const [description, setDescription] = useState(false);
const [character, setCharacter] = useState({});
const [characters, setCharacters] = useState([]);
```
            -Function for the modal 
```js
function display() {
    setDescription((prev) => !prev);
  }
```
            -function for the handlClick

```js
function handleClick(characterInfo) {
    setCharacter(characterInfo);
    display();
  }
  ```
            -then make sure you change the return, to include the onClick and handleClick for the nextButton, prevButton. Also added a ternanry statement about the descritption if it will show up when clicked in the return

```js
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
```
---
### Complete App.js explained

```js
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
```
---

### Complete Nav.jsx 

```js
import React from 'react'

function Nav (){
    return(
        <nav className='TitleName'>
            <h1> Superheros </h1>  
        </nav>
    )
}
export default Nav
```
---
### Complete Character.jsx
```js
import './App.css';

function Character() {
    return (
      <div>
        <nav>
          <h1> Superheroes </h1>
        </nav>
      </div>
    );
  }
export default Character;
```
---
### Complete App.css explained
```js
//this url is an import for the font title
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

// this was for the background image added
body {
  background-image: url(./s-l1600.jpg) ;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100%;
}

//Has the 'Superhero' title at the top of the page
Nav {
  color: #df6020;
  font-family: 'Bangers', cursive;
  text-align: center;
  font-size: 40px;
  //below, adds a shadow around the words
  text-shadow: 0 0px 30px rgba(2, 255, 61, 0.985) ;
  //below, give the words borders
  -webkit-text-stroke: 1px black;
}


/* this sets a grid of the pictures */
.container {
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr ; 
  grid-template-rows: 1fr 1fr 1fr 1fr  ; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . ."
    ". . ."
    ". . ."; 
  color: black;
  //below, this added a gap between the columns
  column-gap: 15px;
  //below, this added a gap between the rows
  row-gap: 20px ;
  box-shadow: 11px 6px 51px green;
}


/* this code only shows the information of the characters on a light black screen with the information */
.modal {
  position: fixed; /* Stay in place */
  left: 0;
  top: 0;
  bottom: 30px;
  width: 100%;
  height:  100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); 
}

/* this shows what the infomation will look like */
.modal-content {
  border-radius: 20%;
  margin-top: 20px;
  text-align: center;
  color: white;
  background-color: #4fb04f;
  opacity: .9; 
  position: absolute;
  left: 50%;
  top: 50%;
  height: 45vh;
  width: 45vw;
  transform: translate(-50%, -50%);
  font-family:Arial, Helvetica, sans-serif;
  font-size: 23px;
}

//for the box containing the character cards
.Character-container {
 background-color: #a5a283;
 border-style: solid;
 border-color: #80716a;
 border-width: 4px;
 border-radius: 10px;
 width: 222px ;
 height: 430px ;
 padding: 20px;
 box-shadow: 11px 6px 51px green;
}


.image {
display: flex;
align-items: center;
width: 200px;
height: 200px;
box-shadow: 11px 6px 51px black; 
border-radius: 10px;
}


.Character-Name {
  text-align: center;
  font-size: 15px;
  font-family: 'Bangers';
  -webkit-text-stroke: .005px white;
}


.powerstats {
  font-size: 10px;
  background-color: #fcf4d9;
  height: 130px;
  border-radius: 10px;
  border-style: solid;
  border-color: green ;
}


.alignment {
  font-size: 10px;
  background-color: black;
  color: white;
  display: block;
  border-radius: 5px;
  width: 100px;
  text-align: center;
}


.nextButton {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3px;
  padding: 12px 24px;
  border: 0;
  color: #3a4149;
  background: #e7ebee;
  line-height: 1.15;
  font-size: 16px;
}//below the hover aspect is when you go over the button the border will change to the green color
  .nextButton:hover {
    transition: all .1s ease;
    box-shadow: 0 0 0 0 #fff, 0 0 0 3px #1de9b6;
  }


.prevButton {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3px;
  padding: 12px 24px;
  border: 0;
  color: #3a4149;
  background: #e7ebee;
  line-height: 1.15;
  font-size: 16px;
  column-gap: 20px;
  margin: 20px;
}
.prevButton:hover {
  transition: all .1s ease;
  box-shadow: 0 0 0 0 #fff, 0 0 0 3px #1de9b6;
  }

```


---
### Problems
-Somehthing I had a problem with is created the next and prev buttons to show a certain amount of characters on the page (handleClicks and how to write the function in order for it to work)

-Something else I had trouble with was playing around with the css to make sure everything looked aligned and acutally had depth to the color and everything wasn't just flat against the background

---
### Future ideas
-I would like the make a transition for the modal

-I would like to create nicer buttons

-I would like like the make the modal look nice will holding the information