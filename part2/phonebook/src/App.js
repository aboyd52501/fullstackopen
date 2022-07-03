import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = event => setFilter(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) { // If this person already exists, don't add them.
      alert(`${newName} is already in the phonebook!`);
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: crypto.randomUUID()
      };
      setPersons([...persons, newPerson]);
    }
    
    setNewName('');
    setNewNumber('');

  };

  return (
    <div>
      <h1>Phonebook</h1>

      <div>filter shown with <input value={filter} onChange={handleFilter} /></div>

      <h2>Add new person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {
      persons
        .filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
        .map(person => <p key={person.id}>{person.name}: {person.number}</p>)
      }
    </div>
  )
}

export default App
