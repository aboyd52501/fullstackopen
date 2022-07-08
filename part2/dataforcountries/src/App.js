import { useState, useEffect } from 'react'
import axios from 'axios'


const SearchField = ({ value, onChange }) => {
  return (
    <div>find countries <input value={value} onChange={onChange} /></div>
  );
};

const App = (props) => {

  const [search, setSearch] = useState('');

  const handleSearch = (e) => setSearch(e.target.value);

  const [countries, setCountries] = useState([]);
  const fetchCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(({data}) => setCountries(data));
  };
  useEffect(fetchCountries, []);

  return (
    <div>
      <SearchField value={search} onChange={handleSearch} />
      {countries.map(cnty => <p key={cnty.cca2}>{cnty.name.common}</p>)}
    </div>
  );
}

export default App;
