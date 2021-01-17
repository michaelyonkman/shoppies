import React from 'react';
import ReactPaginate from 'react-paginate';
import imageNA from '../assets/imageNA.jpg';

const Results = (props) => {
  //function to add movie to nominations list, but only if there are fewer than 5 current nominations, otherwise modal will be shown.
  const handleClick = (e) => {
    const [nominatedMovie] = props.results.Search.filter(
      (movie) => movie.imdbID === e.target.value
    );
    props.setNominations((prevState) => [...prevState, nominatedMovie]);
    if (props.nominations.length === 4) {
      props.setModalVisible(true);
    } else {
      props.setModalVisible(true);
    }
  };
  //pagination logic to change current page view
  const handlePageChange = (selectedObject) => {
    props.setCurrentPage(selectedObject.selected);
  };
  //add default src for broken images
  const addDefaultSrc = (event) => {
    event.target.src = imageNA;
  };
  return (
    <div className="flex-child results">
      <h3>Results</h3>
      {props.results.Search ? (
        props.results.Search.map((movie) => {
          return (
            <div key={movie.imdbID} className="result">
              <img
                src={movie.Poster}
                alt="movie poster"
                onError={addDefaultSrc}
              />
              <h5>{movie.Title}</h5>
              <p>{movie.Year}</p>
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
          <p className="message">No results</p>
        </div>
      )}
      {props.results.Search && (
        <div className="paginate">
          <ReactPaginate
            pageCount={props.pageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            activeLinkClassName={'active-page'}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
