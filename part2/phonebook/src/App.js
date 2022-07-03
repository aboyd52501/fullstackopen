import { useState } from 'react'

import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'


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

      <Filter
        value={filter}
        onChange={handleFilter}
      />

      <h2>Add new person</h2>
      
      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        nameChange={handleName}
        numberValue={newNumber}
        numberChange={handleNumber}
      />

      <h2>Numbers</h2>

      <Persons
        contacts={persons}
        filter={filter}
      />

    </div>
  )
}

export default App
