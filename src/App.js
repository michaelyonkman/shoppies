import './App.css';
import React, { useState, useEffect } from 'react';
import Results from './Components/Results';
import Nominations from './Components/Nominations';

function App() {
  const URL = 'http://www.omdbapi.com/?apikey=c22a9346&type=movie&s=';

  const [searchVal, setSearchVal] = useState('');
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    console.count();
    const fetchMovies = async (searchVal) => {
      const response = await fetch(URL + searchVal);
      const status = await response.status;
      if (status >= 200 && status < 300) {
        const data = await response.json();
        setResults(data);
      } else {
        throw { status: status, body: await response.json() };
      }
    };
    fetchMovies(searchVal);
  }, [searchVal]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Shoppies</h1>
      </header>
      <div className="search">
        <h1>Search Movies</h1>
        <input onChange={(e) => setSearchVal(e.target.value)}></input>
        <Results
          results={results.Search}
          searchVal={searchVal}
          setNominations={setNominations}
        />
        <Nominations nominations={nominations} />
      </div>
    </div>
  );
}

export default App;
