package lt.codeacademy.moviereview.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
@Api(tags = "Movie controller")
public class MovieController {

    private final MovieService movieService;
    private final RatedMovieDtoMapper movieDtoMapper;

    @GetMapping
    @ApiOperation("Get all movies with its rating")
    @ApiResponse(code = 200, message = "Movies loaded successfully")
    public List<RatedMovieDto> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();

        return movies.stream()
                .map(movieDtoMapper::mapToDto)
                .sorted(Comparator.comparing(RatedMovieDto::getCreationDate).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping(TOP)
    @ApiOperation("Get all top movies")
    @ApiResponse(code = 200, message = "Movies loaded successfully")
    public List<RatedMovieDto> getTopMovies() {
        List<Movie> movies = movieService.getAllMovies();

        return movies.stream()
                .map(movieDtoMapper::mapToDto)
                .sorted(Comparator.comparing(RatedMovieDto::getAverageRating).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping(BY_UUID)
    @ApiOperation("Get movie by its id")
    @ApiResponse(code = 200, message = "Movie loaded successfully")
    public RatedMovieDto getRatedMovieById(@PathVariable(UUID) UUID uuid) {
        Movie movie = movieService.getMovieById(uuid);

        return movieDtoMapper.mapToDto(movie);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    @ApiOperation("Create a movie")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Movie created successfully"),
            @ApiResponse(code = 401, message = "Login to create a movie"),
            @ApiResponse(code = 403, message = "Need required permissions to create a movie")
    })
    public void createMovie(@Valid @RequestBody Movie movie) {
        movieService.createMovie(movie);
    }

    @PutMapping(BY_UUID)
    @PreAuthorize("hasRole('ADMIN')")
    @ApiOperation("Update a movie")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Movie updated successfully"),
            @ApiResponse(code = 401, message = "Login to update a movie"),
            @ApiResponse(code = 403, message = "Need required permissions to update a movie")
    })
    public void updateMovie(@PathVariable(UUID) UUID uuid, @Valid @RequestBody Movie movie) {
        movie.setId(uuid);
        movieService.updateMovie(movie);
    }

    @DeleteMapping(BY_UUID)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    @ApiOperation("Delete a movie")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Movie deleted successfully"),
            @ApiResponse(code = 401, message = "Login to delete a movie"),
            @ApiResponse(code = 403, message = "Need required permissions to delete a movie")
    })
    public void deleteMovie(@PathVariable(UUID) UUID uuid) {
        movieService.deleteMovieById(uuid);
    }


}
