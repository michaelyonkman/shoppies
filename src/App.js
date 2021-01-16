import './App.css';
import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import Nominations from './components/Nominations';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [nominations, setNominations] = useState(() => {
    const localData = localStorage.getItem('nominations');
    return localData ? JSON.parse(localData) : [];
  });
  const [modalVisible, setModalVisible] = useState(false);
  const handleClose = () => setModalVisible(false);
  const handleShow = () => setModalVisible(true);
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

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchMovies(query, currentPage);
  }, [query, currentPage]);

  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nominations));
  }, [nominations]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo-text">The Shoppies</h1>
      </header>
      <div className="app-container">
        <Search handleQueryChange={handleQueryChange} />
        <div className="flex-container">
          <Results
            results={results}
            nominations={nominations}
            setNominations={setNominations}
            fetchMovies={fetchMovies}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            setModalVisible={handleShow}
          />
          <Nominations
            results={results}
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
              <button onClick={handleClose}>Submit</button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default App;
