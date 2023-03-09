import { useEffect, useState, useRef } from 'react'
import { getPeople, getCharacter, getCurrentSearch } from './api/people';
//import data from './data.json';
import './App.css'

function App() {

  const searchInput = useRef(null);
  const [people, setPeople] = useState([]);
  const [idCharacterState, setIdCharacterState] = useState(1);
  const [details, setDetails] = useState({});
  const [currentSearch, setCurrentSearch] = useState("");
  const [errorState, setErrorState] = useState({ hasError: false });

  useEffect(() => {
    getPeople().then((data) => setPeople(data.results))
               .catch(handleError);
  }, [])

  useEffect(() => {
    getCharacter(idCharacterState)
      .then(data => setDetails(data))
      .catch(handleError)
  }, [idCharacterState])

  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  }

  const handleInfoPer = (character) => {
    const idCharacter = Number(character.url.split('/').slice(-2)[0]);
    setIdCharacterState(idCharacter);
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    const currentSearch = searchInput.current.value;
    setCurrentSearch(currentSearch);
  }

  const handleOnKeyDown = (e) => {
    if(e.key !== 'Enter') return;
    searchInput.current.value = "";
    setDetails({});

    getCurrentSearch(currentSearch)
      .then(data => setPeople(data.results))
      .catch(handleError);
  }

  return (
    <div className="App">
      <h1>Prueba tecnica React</h1>
      <input
        ref={searchInput}
        type="text" 
        placeholder="Search Character..." 
        onChange={handleOnChange} 
        onKeyDown={handleOnKeyDown} 
      />
      {errorState.hasError && <p>{errorState.message}</p>}
      <ul>
        {people.map(character => (
          <li key={character.name} onClick={() => handleInfoPer(character)}>{character.name}</li>
        ))}
      </ul>
      {details && (
        <aside>
          <h4>{details.name}</h4>
          <ul>
            <li>Genero: {details.gender}</li>
            <li>Nombre: {details.name}</li>
            <li>Estatura: {details.height}</li>
          </ul>
        </aside>
      )}
    </div>
  )
}

export default App
