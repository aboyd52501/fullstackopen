
const Person = ({ person, remove }) => {

    const removePerson = e => {
        e.preventDefault();
        return remove(person);
    };

    return (
        <p>{person.name}: {person.number} <button onClick={removePerson}>Delete</button></p>
    );
};

const Persons = ({ contacts, filter, remove }) => (
    <div>
        {
        contacts
        .filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
        .map(person => <Person key={person.id} person={person} remove={remove} />)
        }
    </div>
);

export default Persons