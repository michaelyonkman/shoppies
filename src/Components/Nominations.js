import React, { useState, useEffect } from 'react';

const Nominations = (props) => {
  console.log(props.nominations);
  return (
    <div className="nominations">
      <h1>Nominations</h1>
      {props.nominations &&
        props.nominations.map((movie) => {
          return (
            <div key={movie.imdbID} className="nomination">
              <h1>{movie.Title}</h1>
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
        })}
    </div>
  );
};

export default Nominations;
