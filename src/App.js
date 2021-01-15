import './App.css';
import React, { useState, useEffect } from 'react';
import Results from './Components/Results';
import Nominations from './Components/Nominations';
// import camera from './assets/jeremy-yap-J39X2xX_8CQ-unsplash.jpg';

function App() {
  const [searchVal, setSearchVal] = useState('');
  const [results, setResults] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [nominations, setNominations] = useState(() => {
    const localData = localStorage.getItem('nominations');
    return localData ? JSON.parse(localData) : [];
  });

  const fetchMovies = async (searchVal, currentPage) => {
    console.log(searchVal, currentPage);
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${
        process.env.REACT_APP_API_KEY
      }&type=movie&s=${searchVal}&page=${currentPage + 1}`
    );
    if (response.ok) {
      const data = await response.json();
      setResults(data);
      setPageCount(Math.ceil(Number(data.totalResults) / 10));
    } else {
      throw Error(response.statusText);
    }
  };

  const handleQueryChange = (event) => {
    setSearchVal(event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchMovies(searchVal, currentPage);
  }, [searchVal, currentPage]);

  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nominations));
  }, [nominations]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo-text">The Shoppies</h1>
      </header>
      {/* <div>
        <img src={camera} alt="vintage movie countdown" />
      </div> */}
      <div className="search">
        <h1>Search</h1>
        <input
          className="search-bar"
          placeholder="Enter a movie to search"
          onChange={(e) => handleQueryChange(e)}
        ></input>

        <div className="flex-container">
          <Results
            results={results}
            nominations={nominations}
            setNominations={setNominations}
            fetchMovies={fetchMovies}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />
          <Nominations
            results={results}
            nominations={nominations}
            setNominations={setNominations}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
