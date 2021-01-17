import React from 'react';

const Nominations = (props) => {
  //function to remove nomination from list
  const handleClick = (e) => {
    props.setNominations(
      props.nominations.filter((movie) => movie.imdbID !== e.target.value)
    );
  };
  return (
    <div className="flex-child nominations">
      <h3>Nominations</h3>

      {props.nominations.length ? (
        props.nominations.map((movie) => {
          return (
            <div key={movie.imdbID} className="nomination">
              <img src={movie.Poster} alt="movie poster" />
              <h5>{movie.Title}</h5>
              <p>{movie.Year}</p>
              <button value={movie.imdbID} onClick={handleClick}>
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <div>
          <p className="message">No nominations</p>
        </div>
      )}
    </div>
  );
};

export default Nominations;
