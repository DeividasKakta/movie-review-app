import HTTP from "./index";

const fetchMovies = () => HTTP.get('/movies')

const fetchRatedMovieById = (id) => HTTP.get('/movies/' + id)

const createMovie = (movie) => HTTP.post('/movies', movie)

export {fetchMovies, createMovie, fetchRatedMovieById}