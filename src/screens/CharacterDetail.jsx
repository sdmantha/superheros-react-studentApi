import { useState, useEffect } from "react";
import { deleteCharacter, getCharacter } from "../services/characters.js";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function CharacterDetail() {
  const [character, setCharacter] = useState({});

  let { name } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetchCharacter();
  }, []);

  async function fetchCharacter() {
    let oneCharacter = await getCharacter(name);
    setCharacter(oneCharacter);
  }

  async function handleDelete() {
    await deleteCharacter(name);
    navigate("/characters", { replace: true });
  }

  return (
    <div>
      <h2>{character.name}</h2>
      <p>{character.image}</p>
      <p>{character.alignment}</p>
      <p>{character.intelligence}</p>
      <p>{character.strength}</p>
      <p>{character.speed}</p>
      <p>{character.durability}</p>
      <p>{character.power}</p>
      <p>{character.combat}</p>
      <p>{character.species}</p>
      <p>{character.gender}</p>
      <p>{character.race}</p>
      <p>{character.height}</p>
      <p>{character.weight}</p>
      <p>{character.eyeColor}</p>
      <p>{character.hairColor}</p>
      <div>
        
        <Link to={`/characters/${character.name}/edit`}>
          <button>Edit Character</button>
        </Link>
        <button onClick={handleDelete}>Destroy Character!</button>
      </div>
    </div>
  );
}
 