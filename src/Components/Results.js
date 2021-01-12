import React from 'react';

const Results = (props) => {
  console.log(props.results);
  return (
    <div className="results">
      <h1>Results for "{props.searchVal}"</h1>
      {props.results &&
        props.results.map((movie) => {
          return (
            <div key={movie.imdbID} className="result">
              <p>{movie.Title}</p>
              <button
                value={JSON.stringify({ title: movie.Title, id: movie.imdbID })}
                onClick={(e) =>
                  props.setNominations((prevState) => [
                    ...prevState,
                    JSON.parse(e.target.value),
                  ])
                }
              >
                Nominate
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Results;
