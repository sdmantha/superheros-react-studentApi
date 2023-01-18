import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCharacter } from "../services/characters.js";

export default function CharacterCreate() {
  const [character, setCharacter] = useState({
    name: "",
    image: "",
    alignment: "",
    intelligence: "",
    strength: "",
    speed: "",
    durability: "",
    power: "",
    combat: "",
    species: "",
    gender: "",
    race: "",
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
  }); 
  
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data so it matches schema
    let fixedCharacter = {
        powerstats: {
            intelligence: character.intelligence,
            strength: character.strength,
            speed: character.speed,
            durability: character.durability,
            power: character.power,
            combat: character.combat
        },
        appearance: {
            gender: character.gender,
            race: character.race,
            height:character.height,
            weight: character.weight,
            eyeColor: character.eyeColor,
            hairColor:character.hairColor
        }
    }

    await createCharacter(fixedCharacter);
    navigate(`/character/${character.name}`, { replace: true });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(name, value)

    setCharacter((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  return (
    <div>
      <h1>Character Create Screen</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please insert your Name"
          name="name"
          value={character.name}
          onChange={handleChange}
        />
        <input
          type="image"
          placeholder="Please insert your image"
          name="image"
          value={character.image}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your are good or bad"
          name="alignment"
          value={character.alignment}
          onChange={handleChange}
        />
        <h2>Power Stats:</h2>
        <input
          type="text"
          placeholder="Please insert your interlligence Power"
          name="intelligence"
          value={character.intelligence}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Strength Power"
          name="strength"
          value={character.strength}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Speed Power"
          name="speed"
          value={character.speed}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Durability Power"
          name="durability"
          value={character.durability}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Power Stat"
          name="power"
          value={character.power}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Combat Power"
          name="combat"
          value={character.combat}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Species "
          name="species"
          value={character.species}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Gender"
          name="gender"
          value={character.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your race"
          name="race"
          value={character.race}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Height"
          name="height"
          value={character.height}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Weight "
          name="weight"
          value={character.weight}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Eye Color"
          name="eyeColor"
          value={character.eyeColor}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Please insert your Hair Color"
          name="hairColor"
          value={character.hairColor}
          onChange={handleChange}
        />
        <button type="submit">Create Your Character!!!</button>
      </form>
    </div>
  );
}
