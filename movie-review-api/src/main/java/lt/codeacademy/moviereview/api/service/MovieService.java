package lt.codeacademy.moviereview.api.service;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.exception.MovieNotFoundException;
import lt.codeacademy.moviereview.api.model.entity.Movie;
import lt.codeacademy.moviereview.api.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public void createMovie(Movie movie) {
        movieRepository.save(movie);
    }

    public void updateMovie(Movie movie) {
        if (movieRepository.findById(movie.getId()).isPresent()) {
            movieRepository.save(movie);
        } else {
            throw new MovieNotFoundException();
        }
    }

    public void deleteMovieById(UUID uuid) {
        try {
            movieRepository.deleteById(uuid);
        } catch (Exception e) {
            throw new MovieNotFoundException();
        }
    }
}
