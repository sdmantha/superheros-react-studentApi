import "./App.css";
import Nav from "./Nav";
import Home from "./screens/Home";
import Characters from "./screens/Characters.jsx";
import CharacterCreate from "./screens/CharacterCreate.jsx";
import CharacterEdit from "./screens/CharacterEdit";
import {Routes, Route} from 'react-router-dom';
import CharacterDetail from "./screens/CharacterDetail.jsx";

function App() {
  

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/characters" element={<Characters />} />
        <Route path="/add-character" element={<CharacterCreate />} />
        <Route path="/characters/:id/edit" element={<CharacterEdit/>} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
      </Routes>
      
    </div>
  );
}

export default App;
