import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Homepage from './pages/Homepage'
import Moviepage from './pages/Movie'
import Header from './components/Header'

function App() {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [likedMovies, setLikedMovies] = useState([]);
  const [isEmptySearch, setIsEmptySearch] = useState(true)
  
  const handleSearch = (text) => {
    setSearchText(text)
  }

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (searchText === '') {
        setIsEmptySearch(true)
        setMovies('')
      } else {
        setIsEmptySearch(false)
        setMovies(data.Search)
      }
    })
    .catch(error => {
      console.error(error);
    })
  }, [searchText])

  const handleLike = (movie) => {
    const movieFound = likedMovies.find((obj) => {return obj.imdbID === movie.imdbID})
    if (movieFound) {
      setLikedMovies(likedMovies.filter((obj) => obj !== movieFound))
    } else {
      setLikedMovies((prevMovies) => [...prevMovies, movie])
    }
  }

  const isMovieLiked = (movie) => {
      return likedMovies.find((likedMovie) => likedMovie.imdbID === movie.imdbID) || false;
  }

  const clearSearch = () => {
    setSearchText('')
  }

  return (
    <div className='container'>
      <Header clearSearch={clearSearch}/>
        <Routes>
            <Route exact path="/" element={<Homepage handleSearch={handleSearch} movies={movies} isLoading={isLoading} handleLike={handleLike} isMovieLiked={isMovieLiked} isEmptySearch={isEmptySearch} />}/>
            <Route path="/:movieId" element={<Moviepage isMovieLiked={isMovieLiked} likedMovies={likedMovies} handleLike={handleLike} />}/>
        </Routes>
    </div>
  );
}

export default App;
