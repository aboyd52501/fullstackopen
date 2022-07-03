const Person = ({name, number}) => (
    <p>{name}: {number}</p>
);

const Persons = ({ contacts, filter }) => (
    <div>
        {
        contacts
        .filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
        .map(person => <Person key={person.id} name={person.name} number={person.number} />)
        }
    </div>
);

export default Persons