import HTTP from "./index";

const fetchMovies = () => HTTP.get('/movies')

const fetchRatedMovieById = (id) => HTTP.get('/movies/' + id)

const createMovie = (movie) => HTTP.post('/movies', movie)

const editMovie = (movie, uuid) => HTTP.put('/movies/' + uuid, movie)

const deleteMovie = (id) => HTTP.delete('/movies/' + id)

const fetchTopMovies = () => HTTP.get('/movies/top')

export {fetchMovies, createMovie, fetchRatedMovieById, fetchTopMovies, editMovie, deleteMovie}