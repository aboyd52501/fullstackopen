import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1
    },
  ]) 
  const [newName, setNewName] = useState('')

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) { // If this person already exists, don't add them.
      alert(`${newName} is already in the phonebook!`);
    }
    else {
        const newPerson = {
        name: newName,
        id: crypto.randomUUID()
      };
      setPersons([...persons, newPerson]);
    }
    
    setNewName('');

  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id}>{person.name}</p>)}
    </div>
  )
}

export default App
