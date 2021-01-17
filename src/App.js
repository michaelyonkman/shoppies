import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import Nominations from './components/Nominations';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  //state for pagination
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  //state for nominations and retrieving nominations from local storage
  const [nominations, setNominations] = useState(() => {
    const localData = localStorage.getItem('nominations');
    return localData ? JSON.parse(localData) : [];
  });
  //state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const handleClose = () => setModalVisible(false);
  const handleShow = () => setModalVisible(true);
  const handleSubmit = () => {
    setNominations([]);
    setModalVisible(false);
  };
  //async request to fetch movies on query change
  const fetchMovies = async (query, currentPage) => {
    console.log(query, currentPage);
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${
        process.env.REACT_APP_API_KEY
      }&type=movie&s=${query}&page=${currentPage + 1}`
    );
    if (response.ok) {
      const data = await response.json();
      setResults(data);
      setPageCount(Math.ceil(Number(data.totalResults) / 10));
    } else {
      throw Error(response.statusText);
    }
  };
  //updating state on query change
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(0);
  };
  //refetching data on every change of query value and setting current page back to 1
  useEffect(() => {
    fetchMovies(query, currentPage);
  }, [query, currentPage]);
  //storing nominations in local storage with each new addition
  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nominations));
  }, [nominations]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo-text">The Shoppies</h1>
      </header>
      <div className="intro">
        <h4>Welcome to The Shoppies!!!</h4>
        <p>
          We value your opinion and want{' '}
          <span className="highlight-text">you</span> to help us choose the
          winners of this prestigious award. Search and select five of your
          favourite movies of all time and add them to your nominations list.
          Once you've added five movies you'll be given the option to either
          submit if you're done, or edit your list to make changes.{' '}
          <span className="highlight-text">Happy nominating!</span>
        </p>
      </div>
      <div className="app-container">
        <Search handleQueryChange={handleQueryChange} />
        <div className="flex-container">
          <Results
            results={results}
            nominations={nominations}
            setNominations={setNominations}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            setModalVisible={handleShow}
          />
          <Nominations
            nominations={nominations}
            setNominations={setNominations}
          />
        </div>
        <>
          <Modal show={modalVisible} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title style={{ textDecoration: 'underline #008060' }}>
                Submit nominations?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You've reached 5 nominations. Are you ready to submit?
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Edit</button>
              <button onClick={handleSubmit}>Submit</button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default App;
