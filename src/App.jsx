import { useEffect, useState } from 'react'
import { getPeople } from './api/people';
import data from './data.json';
import './App.css'

function App() {

  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((data) => setPeople(data.results))
               .catch(err => console.error(err));
  }, [])

  return (
    <div className="App">
      <h1>Prueba tecnica React</h1>
      <ul>
        {people.map(character => (
          <li key={character.name}>{character.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
