import React from 'react';
import ReactPaginate from 'react-paginate';
import imageNA from '../assets/imageNA.jpg';

const Results = (props) => {
  const handleClick = (e) => {
    console.log(props.nominations);
    if (props.nominations.length < 5) {
      const [nominatedMovie] = props.results.Search.filter(
        (movie) => movie.imdbID === e.target.value
      );
      props.setNominations((prevState) => [...prevState, nominatedMovie]);
      if (props.nominations.length === 4) {
        props.setModalVisible(true);
      }
    } else {
      props.setModalVisible(true);
    }
  };
  const handlePageChange = (selectedObject) => {
    props.setCurrentPage(selectedObject.selected);
  };

  const addDefaultSrc = (event) => {
    event.target.src = imageNA;
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
                onClick={handleClick}
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
          <p>No results</p>
        </div>
      )}
      {props.results.Search && (
        <div className="paginate">
          <ReactPaginate
            pageCount={props.pageCount}
            pageRange={2}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            activeLinkClassName={'active-page'}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
