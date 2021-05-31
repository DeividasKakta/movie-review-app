import HTTP from "./index";

const fetchMovies = () => HTTP.get('/movies')

const createMovie = (movie) => HTTP.post('/movies', movie)

export {fetchMovies, createMovie}