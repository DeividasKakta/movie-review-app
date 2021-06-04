package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.config.Endpoint;
import lt.codeacademy.moviereview.api.model.entity.Movie;
import lt.codeacademy.moviereview.api.service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static lt.codeacademy.moviereview.api.config.Endpoint.*;

@RestController
@RequestMapping(API_ROOT + MOVIES)
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping(BY_UUID)
    public Movie getMovieById(@PathVariable(UUID) UUID uuid) {
        return movieService.getMovieById(uuid);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createMovie(@Valid @RequestBody Movie movie) {
        movieService.createMovie(movie);
    }

    @PutMapping(BY_UUID)
    public void updateMovie(@PathVariable(UUID) UUID uuid, @Valid @RequestBody Movie movie) {
        movie.setId(uuid);
        movieService.updateMovie(movie);
    }

    @DeleteMapping(BY_UUID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMovie(@PathVariable(UUID) UUID uuid) {
        movieService.deleteMovieById(uuid);
    }
}
