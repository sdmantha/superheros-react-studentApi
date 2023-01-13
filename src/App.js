import './App.css'
import { useEffect, useState } from 'react'
import Nav from './Nav.jsx'

function App (){
  const [description,setDescription]= useState(false)
  const [character, setCharacter] = useState ({})
  const [characters,setCharacters] = useState([])


    useEffect(()=> {
      apiCall ()
    }, [])

  function apiCall (){
      fetch("https://superhero-api-production.up.railway.app/api/superheroes")
          .then((res)=> res.json())
          .then((data)=> setCharacters(data))
  }

  function display() {
      setDescription(prev => !prev)
  }

  function handleClick(characterInfo){
      setCharacter(characterInfo)
      display()
  }

console.log(characters)



  return (
      <div className="App">
          <Nav />
          <div className="container">
          {/* the question mark was added bc without it, the page was refreshing right after it shows up. the ? makes sure its reading the code "do this, before loading the rest of the data" */}
              {characters?.map((character, index) => (
                <div className="Character-container" onClick={() => handleClick(character)} key={index}>
                    <img className='image'src={character.image} />
                    <div className="Character-Name">
                    <h3> {character.name} </h3>
                    </div>
                </div>
              )
              )
              }
          </div>
          


        {description ?
          <div className="modal">
            <div className="modal-content">
              <h1 className='powerstats'>
                 {/* creating props */}
              <p> Intelligence{character.powerstats.intelligence}</p>
              <p> Strength- {character.powerstats.strength}</p>
              <p> Speed- {character.powerstats.speed}</p>
              <p> Durability- {character.powerstats.durability}</p>
              <p> Power- {character.powerstats.power}</p>
              <p> Combat- {character.powerstats.combat}</p>
              </h1>
              <h2 className='appearance'>
              <p>Gender- {character.appearance.gender}</p>
              <p>Race- {character.appearance.race}</p>
              <p>Height- {character.appearance.height}</p>
              </h2>
              <p>Weight- {character.weight}</p>
              <p>Eye Color - {character.eyeColor}</p>
              <p>Hair Color - {character.hairColor}</p>
              <button onClick={display}>Close</button>
            </div>
          </div>
          :
          null
        };
      </div>
  );
};

export default App;