import './App.css';
import React, { useState, useEffect } from 'react';
import Results from './Components/Results';
import Nominations from './Components/Nominations';

function App() {
  const [searchVal, setSearchVal] = useState('');
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState(() => {
    const localData = localStorage.getItem('nominations');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    const fetchMovies = async (searchVal) => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&type=movie&s=` +
          searchVal
      );
      if (response.ok) {
        const data = await response.json();
        console.log('RESPONSE', data);
        setResults(data);
      } else {
        throw Error(response.statusText);
      }
    };
    fetchMovies(searchVal);
  }, [searchVal]);

  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nominations));
  }, [nominations]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo-text">the shoppies</h1>
      </header>
      <div className="search">
        <h1>Search Movies</h1>
        <input
          className="search-bar"
          placeholder="Enter movie to search"
          onChange={(e) => setSearchVal(e.target.value)}
        ></input>
        <Results
          results={results.Search}
          searchVal={searchVal}
          nominations={nominations}
          setNominations={setNominations}
        />
        <Nominations
          results={results}
          nominations={nominations}
          setNominations={setNominations}
        />
      </div>
    </div>
  );
}

export default App;
