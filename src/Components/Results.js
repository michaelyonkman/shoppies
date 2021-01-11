import React from 'react';

const Results = (props) => {
  console.log(props.results);
  return (
    <div className="results">
      <h1>Results</h1>
      {props.results &&
        props.results.map((movie) => {
          return (
            <div key={movie.imdbID} className="result">
              <p>{movie.Title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Results;
