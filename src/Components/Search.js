import React, { useState, useEffect } from 'react';
import Results from './Results';

const URL = 'http://www.omdbapi.com/?apikey=c22a9346&s=';
// const fetchMovies = async (searchVal) => {
//   const response = await fetch(URL + searchVal);
//   const status = await response.status;
//   if (status >= 200 && status < 300) {
//     return await response.json();
//   } else {
//     throw { status: status, body: await response.json() };
//   }
// };

const Search = () => {
  const [searchVal, setSearchVal] = useState('');
  const [results, setResults] = useState([]);
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
    <div className="search">
      <h1>Search Movies</h1>
      <input onChange={(e) => setSearchVal(e.target.value)}></input>
      <Results results={results.Search} />
    </div>
  );
};

export default Search;
