import React from 'react';

const Nominations = (props) => {
  const handleClick = (e) => {
    props.setNominations(
      props.nominations.filter((movie) => movie.imdbID !== e.target.value)
    );
  };
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
              <button value={movie.imdbID} onClick={handleClick}>
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <div>
          <p>No nominations</p>
        </div>
      )}
    </div>
  );
};

export default Nominations;
