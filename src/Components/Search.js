import React from 'react';

const Search = (props) => {
  return (
    <div className="search">
      <h1>Search</h1>
      <input
        className="search-bar"
        placeholder="Enter a movie to search"
        onChange={(e) => props.handleQueryChange(e)}
      ></input>
    </div>
  );
};

export default Search;
