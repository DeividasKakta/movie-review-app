package lt.codeacademy.moviereview.api.controller;

import lombok.RequiredArgsConstructor;
import lt.codeacademy.moviereview.api.model.dto.RatedMovieDto;
import lt.codeacademy.moviereview.api.model.entity.Movie;
import lt.codeacademy.moviereview.api.service.MovieService;
import lt.codeacademy.moviereview.api.utils.mapper.RatedMovieDtoMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static lt.codeacademy.moviereview.api.config.Endpoint.*;

@RestController
@RequestMapping(MOVIES)
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final RatedMovieDtoMapper movieDtoMapper;

    @GetMapping
    public List<RatedMovieDto> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();

        return movies.stream()
                .map(movieDtoMapper::mapToDto)
                .sorted(Comparator.comparing(RatedMovieDto::getCreationDate).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping(TOP)
    public List<RatedMovieDto> getTopMovies() {
        List<Movie> movies = movieService.getAllMovies();

        return movies.stream()
                .map(movieDtoMapper::mapToDto)
                .sorted(Comparator.comparing(RatedMovieDto::getAverageRating).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping(BY_UUID)
    public RatedMovieDto getRatedMovieById(@PathVariable(UUID) UUID uuid) {
        Movie movie = movieService.getMovieById(uuid);

        return movieDtoMapper.mapToDto(movie);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public void createMovie(@Valid @RequestBody Movie movie) {
        movieService.createMovie(movie);
    }

    @PutMapping(BY_UUID)
    @PreAuthorize("hasRole('ADMIN')")
    public void updateMovie(@PathVariable(UUID) UUID uuid, @Valid @RequestBody Movie movie) {
        movie.setId(uuid);
        movieService.updateMovie(movie);
    }

    @DeleteMapping(BY_UUID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMovie(@PathVariable(UUID) UUID uuid) {
        movieService.deleteMovieById(uuid);
    }


}
