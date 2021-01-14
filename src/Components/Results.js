import React from 'react';

const Results = (props) => {
  console.log(props.results);
  return (
    <div className="results">
      {props.results && <h1>Results for "{props.searchVal}"</h1>}
      {props.results &&
        props.results.map((movie) => {
          return (
            <div key={movie.imdbID} className="result">
              <p>{movie.Title}</p>
              <button
                value={movie.imdbID}
                onClick={(e) => {
                  if (
                    !props.nominations.some(
                      (movie) => movie.imdbID === e.target.value
                    )
                  ) {
                    const [nominatedMovie] = props.results.filter(
                      (movie) => movie.imdbID === e.target.value
                    );
                    props.setNominations((prevState) => [
                      ...prevState,
                      nominatedMovie,
                    ]);
                  }
                }}
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
