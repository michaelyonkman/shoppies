import React from 'react';
import ReactPaginate from 'react-paginate';
import film from '../assets/anika-mikkelson-dWYjy9zIiF8-unsplash.jpg';

const Results = (props) => {
  const handlePageChange = (selectedObject) => {
    props.setCurrentPage(selectedObject.selected);
  };

  const addDefaultSrc = (event) => {
    event.target.src = film;
  };
  return (
    <div className="flex-child results">
      <h2>Results</h2>
      {props.results.Search ? (
        props.results.Search.map((movie) => {
          return (
            <div key={movie.imdbID} className="result">
              <img
                src={movie.Poster}
                alt="movie poster"
                onError={addDefaultSrc}
              />
              <h4>{movie.Title}</h4>
              <h5>{movie.Year}</h5>
              <button
                value={movie.imdbID}
                onClick={(e) => {
                  const [nominatedMovie] = props.results.Search.filter(
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
      {props.results.Search && (
        <div className="paginate">
          <ReactPaginate
            pageCount={props.pageCount}
            pageRange={2}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            // containerClassName={'container'}
            // previousLinkClassName={'page'}
            // breakClassName={'page'}
            // nextLinkClassName={'page'}
            // pageClassName={'page'}
            // disabledClassNae={'disabled'}
            // activeClassName={'active'}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
