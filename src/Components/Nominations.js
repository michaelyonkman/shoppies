import React from 'react';

const Nominations = (props) => {
  return (
    <div className="flex-child nominations">
      <h2>Nominations</h2>

      {props.nominations.length ? (
        props.nominations.map((movie) => {
          return (
            <div key={movie.imdbID} className="nomination">
              <img src={movie.Poster} alt="movie poster" />
              <h4>{movie.Title}</h4>
              <h5>{movie.Year}</h5>
              <button
                value={movie.imdbID}
                onClick={(e) => {
                  props.setNominations(
                    props.nominations.filter(
                      (movie) => movie.imdbID !== e.target.value
                    )
                  );
                }}
              >
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <div>
          <p>You have no nominations...</p>
          <p> Get nominatin'!!!</p>
        </div>
      )}
    </div>
  );
};

export default Nominations;
