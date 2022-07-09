import { useState } from 'react'

const PersonForm = ({submitPerson}) => {

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleName = event => setNewName(event.target.value);
    const handleNumber = event => setNewNumber(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPerson = {
            name: newName,
            number: newNumber,
            //id: crypto.randomUUID() // json-server seems to add this field by default, and ensures no collisions.
        };
        submitPerson(newPerson);

        setNewName('');
        setNewNumber('');
    };

    return (
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
    );
}

export default PersonForm
