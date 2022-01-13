import React, { useEffect, useState } from 'react'
import Characters from './components/Characters';
import Navbar from './components/Navbar';
import Pagination from './components/Pagination';




function App() {


  const [characters, setCharacters] = useState([]);

  const [info, setInfo] = useState([]);

  
  // peticion al la api 

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (initialUrl) => {
    fetch(initialUrl)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => console.log(error));
  };


  // porps: funciones para siguinete y anterior 

  const onPrevious = () => {
    fetchCharacters(info.prev);
  }

  const onNext = () => {
    fetchCharacters(info.next);
  }



  // llamamos los datos al rederizar el componente
  useEffect(() => {
    
    fetchCharacters(initialUrl);

  }, []);



  return (
    <>
      <Navbar brand="Rick and Morty App" />

      <div className="container mt-5">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />

        <Characters characters={characters} />

        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </>
  );
}

export default App;
