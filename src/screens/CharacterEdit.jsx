import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateCharacter, getCharacter } from "../services/characters.js";


export default function CharacterEdit() {
    const [character, setCharacter] = useState({
      name: "",
      slug: "",
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

  // let { name } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetchCharacter();
  }, []);

  async function fetchCharacter() {
    let oneCharacter = await getCharacter();
    setCharacter(oneCharacter);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data so it matches schema
    let fixedCharacter = {
      name: character.name,
      slug: character.slug,
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
          height: [character.height],
          weight: [character.weight],
          eyeColor: character.eyeColor,
          hairColor:character.hairColor
      },
      biography: {
        fullName: "",
        alterEgos: "",
        aliases: [],
        placeOfBirth: "",
        firstAppearance: "",
        publisher: "",
        alignment: ""
      },
      work: {
        occupation: "",
        base: ""
      },
      connections: {
        groupAffiliation: "",
        relatives: ""
      },
      images: {
        xs: "",
        sm: character.image,
        md: "",
        lg: ""
      },
  }

  await updateCharacter(fixedCharacter);
  navigate("/characters", { replace: true });
};

    // await updateCharacter(name, fixedCharacter);
    // navigate(`/characters/${character.id}`, { replace: true });
  

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
      <h1>Character Edit Screen</h1>
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
        <input
          type="text"
          placeholder="Please insert your intelligence Power"
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
        <button type="submit">Edit Your Character!!!</button>
      </form>
    </div>
  );
}