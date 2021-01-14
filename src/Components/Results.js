import React from 'react';

const Results = (props) => {
  console.log(props.results);
  return (
    <div className="flex-child results">
      <h2>Results</h2>
      {props.results ? (
        props.results.map((movie) => {
          return (
            <div key={movie.imdbID} className="result">
              <img src={movie.Poster} alt="movie poster" />
              <h4>{movie.Title}</h4>
              <h5>{movie.Year}</h5>
              <button
                value={movie.imdbID}
                onClick={(e) => {
                  const [nominatedMovie] = props.results.filter(
                    (movie) => movie.imdbID === e.target.value
                  );
                  props.setNominations((prevState) => [
                    ...prevState,
                    nominatedMovie,
                  ]);
                }}
                disabled={props.nominations.some(
                  (nomination) => movie.imdbID === nomination.imdbID
                )}
              >
                Nominate
              </button>
            </div>
          );
        })
      ) : (
        <div>
          <p>No results so far...</p>
          <p> Try searching for your favorite movie!!!</p>
        </div>
      )}
    </div>
  );
};

export default Results;
