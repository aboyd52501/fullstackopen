import { useState, useEffect } from 'react'
import axios from 'axios'


const SearchField = ({ value, onChange }) => {
  return (
    <div>Find countries: <input value={value} onChange={onChange} /></div>
  );
};

const ShowButton = ({country, setSearch}) => {
  const searchThisCountry = () => setSearch(country.name.common);
  return (
    <button onClick={searchThisCountry} >Show</button>
  );
};

const CountrySmall = ({country, setSearch}) => (
  <div>{country.name.common} <CountryFlagSmall country={country} /> <ShowButton country={country} setSearch={setSearch} /></div>
);

const CountryFlag = ({country}) => (
  <img
    alt={`The flag of ${country.name.common}`}
    src={country.flags.svg}
    width={200}
  />
);

const CountryFlagSmall = ({country}) => (
  <img
    alt={`The flag of ${country.name.common}`}
    src={country.flags.svg}
    style={{height: '0.8em', display: 'inline'}}
  />
);

const getCapital = country => (country.capital && country.capital[0]) || "None";

const WeatherCapital = ({country}) => {

  const getCap = getCapital(country);

  const weatherName = getCap === "None" ? country.name.common : getCap; // Fix for Antarctica
  const latLong = country.capitalInfo.latlng || country.latlng;

  // Grab the weather (as a side effect) and store it in state
  const [weather, setWeather] = useState(null);
  const fetchWeather = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather", // - ?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        {
          params: {
            lat: latLong[0],
            lon: latLong[1],
            appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
            units: "imperial"
          }
        }
      )
      .then(response => setWeather(response.data));
  };
  useEffect(fetchWeather, [latLong]);

  if (weather === null) 
    return <div>Loading weather for {weatherName}...</div>
  else
    return (
      <div>
        <h2>Weather in {weatherName}</h2>
        <h3>{weather.weather[0].main}</h3>
        <div>Temperature: {weather.main.temp} F</div>
        <div>Feels like: {weather.main.feels_like} F</div>
        <div>Humidity: {weather.main.humidity}%</div>
        <div>Pressure: {weather.main.grnd_level} hPa</div>
        <div>Wind: {weather.wind.speed} mph</div>
        <img alt={weather.weather[0].description} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}/>
      </div>
    );
};

const CountryPage = ({country}) => (
  <div>

    <h1>{country.name.common}</h1>

    <h2>Capital</h2>
    <p>{getCapital(country)}</p>

    <h2>Area</h2>
    <p>{country.area}</p>

    <h2>Languages</h2>
    <ul>
      {
        country.languages ?
          Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>) :
          "None"
      }
    </ul>

    <CountryFlag country={country} />

    <WeatherCapital country={country} />
  </div>
);

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

  const getCountries = () => {

    const filtered = countries.filter(cnty => cnty.name.common.toLowerCase().match(search.toLowerCase()));
    
    const exactMatch = filtered.find(cnty => cnty.name.common.toLowerCase() === search.toLowerCase());

    if (exactMatch)
      return <CountryPage country={exactMatch} />
    else if (filtered.length > 10)
      return <p>Too many matches ({filtered.length}), specify another filter.</p>
    else if (filtered.length > 1)
      return filtered.map(cnty => <CountrySmall key={cnty.cca2} country={cnty} setSearch={setSearch} />);
    else if (filtered.length === 1) {
      const cnty = filtered[0];
      return <CountryPage country={cnty} />
    }
    else
      return <p>No matches.</p>
  };

  return (
    <div>
      <SearchField value={search} onChange={handleSearch} />
      {getCountries()}
    </div>
  );
}

export default App;
