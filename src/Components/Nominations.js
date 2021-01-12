import React, { useState, useEffect } from 'react';

const Nominations = (props) => {
  console.log(props.nominations);
  return (
    <div className="nominations">
      <h1>Nominations</h1>
      {props.nominations &&
        props.nominations.map((movie) => {
          return (
            <div key={movie.id} className="nomination">
              <h1>{movie.title}</h1>
              <button>Remove</button>
            </div>
          );
        })}
    </div>
  );
};

export default Nominations;
