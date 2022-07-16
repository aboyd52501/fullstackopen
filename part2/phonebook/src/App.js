import { useState, useEffect } from 'react'

import personService from './services/personService'

import SuccessNotification from './components/SuccessNotification'
import FailureNotification from './components/FailureNotification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([]);

  const fetchPersons = () =>
    personService
      .getAll()
      .then(data => setPersons(data));

  const addPerson = newPerson =>
    personService
      .add(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
        displaySuccessMsg(`Added ${newPerson.name}`);
        return person;
      });

  const updatePerson = (id, updatedPerson) =>
    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id === id ? returnedPerson : p));
        displaySuccessMsg(`Phone number of ${returnedPerson.name} changed to ${returnedPerson.number}`);
      });

  const submitPerson = newPerson => {
    const exists = persons.find(p => p.name === newPerson.name);
    if (exists && window.confirm(`${newPerson.name} is already in the phonebook. Update their number?`))
      updatePerson(exists.id, newPerson);
    else
      displaySuccessMsg(`No update made to ${newPerson.name}`);
  }

  const removePerson = person => {
    if (window.confirm(`Delete ${person.name}?`))
      return personService
        .remove(person)
        .then(() => {
          displaySuccessMsg(`Removed ${person.name}`);
        })
        .catch(error => {
          displayFailMsg(`Entry for ${person.name} has already been removed from the server`)
        })
        .finally(() => {
          setPersons( persons.filter(p => p.id !== person.id))
        })
  };

  useEffect(() => {
    const func = async () => {
      await fetchPersons();
    }
    func();
  }, []);
  
  const [filter, setFilter] = useState('');

  const handleFilter = event => setFilter(event.target.value);

  const [successMsg, setSuccessMsg] = useState(null);
  const displaySuccessMsg = msg => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const [failMsg, setFailMsg] = useState(null);
  const displayFailMsg = msg => {
    setFailMsg(msg);
    setTimeout(() => setFailMsg(null), 5000);
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <SuccessNotification
        message={successMsg}
      />

      <FailureNotification
        message={failMsg}
      />

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
