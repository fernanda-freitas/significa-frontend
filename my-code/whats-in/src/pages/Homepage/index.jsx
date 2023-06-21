import React from 'react'
import { Link } from 'react-router-dom'
import iconSearch from '../../images/icon-magnifier-grey.svg'
import iconLike from '../../images/icon-heart-grey.svg'
import iconLiked from '../../images/icon-heart-full.svg'
import Loading from '../../components/Loading'
import Empty from '../../components/Empty'
import NotFound from '../../components/Notfound'

export default function Homepage({ handleSearch, movies, isLoading, handleLike, isMovieLiked, isEmptySearch }) {

    const handleChange = (event) => {
        handleSearch(event.target.value)
    }

    const handleClick = (e, movie) => {
        e.preventDefault()
        handleLike(movie)
    }

    // const handleLinkClick = (e) => {
    //     e.stopPropagation()
    // }
    
    return (
        <div className="grid">
            <div className='search'>
                <input onChange={handleChange} className='search__input' type="text" placeholder='Search movies...'/>
                <img className='search__icon' src={iconSearch} alt="Search icon" />
            </div>
            {isLoading ? (
                <Loading />
                ) : movies ? (
                    movies.map((movie) => (
                        <div className="movie-card" key={movie.imdbID}>
                            <Link to={`/${movie.imdbID}`}>
                                <img className="movie-card__image" src={movie.Poster} alt="Movie card" />
                                <button onClick={(e) => handleClick(e, movie)} className={`button-icon movie-card__like ${isMovieLiked(movie) ? 'liked' : ''}`}>
                                    <img src={isMovieLiked(movie) ? iconLiked : iconLike} alt="Like button" />
                                </button>
                                <div className="movie-card__overlay">
                                    <div className="movie-card__description">
                                        <h4 className="movie-card__description__title">{movie.Title}</h4>
                                        <p className="movie-card__description__year">{movie.Year}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    isEmptySearch ? <Empty /> : <NotFound />
                )}
        </div>
    )
}