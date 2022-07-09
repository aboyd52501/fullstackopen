import { useState, useEffect } from 'react'

import personService from './services/personService'

import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {

  const [persons, setPersons] = useState([]);

  const fetchPersons = () =>
    personService
      .getAll()
      .then(data => setPersons(data));

  const addPerson = newPerson =>
    personService
      .add(newPerson)
      .then(data => setPersons(persons.concat(data)));

  const updatePerson = (id, updatedPerson) =>
    personService
      .update(id, updatedPerson)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.id === id ? updatedPerson : p));
      });

  const submitPerson = newPerson => {
    const exists = persons.find(p => p.name === newPerson.name);
    if (exists && window.confirm(`${newPerson.name} is already in the phonebook. Update their number?`))
      updatePerson(exists.id, newPerson);
    else
      addPerson(newPerson);
  }

  const removePerson = person => {
    if (window.confirm(`Delete ${person.name}?`))
      return personService
        .remove(person)
        .then(() => setPersons( persons.filter(p => p.id !== person.id) ));
  };

  useEffect(() => {
    const func = async () => {
      await fetchPersons();
    }
    func();
  }, []);
  
  const [filter, setFilter] = useState('');

  const handleFilter = event => setFilter(event.target.value);

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter
        value={filter}
        onChange={handleFilter}
      />

      <h2>Add new person</h2>
      
      <PersonForm
        submitPerson={submitPerson}
      />

      <h2>Numbers</h2>

      <Persons
        contacts={persons}
        filter={filter}
        remove={removePerson}
      />

    </div>
  )
}

export default App
