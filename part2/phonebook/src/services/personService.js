import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => 
    axios
        .get(BASE_URL)
        .then(response => response.data);

const add = person =>
    axios
        .post(BASE_URL, person)
        .then(response => response.data);

const update = (id, person) =>
    axios
        .put(`${BASE_URL}/${id}`, person)
        .then(response => response.data);

const remove = person =>
    axios
        .delete(`${BASE_URL}/${person.id}`)
        .then(response => response.data);

const personService = { getAll, add, update, remove };

export default personService