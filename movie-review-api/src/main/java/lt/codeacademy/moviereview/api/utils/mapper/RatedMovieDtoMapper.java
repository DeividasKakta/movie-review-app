package lt.codeacademy.moviereview.api.utils.mapper;

import lt.codeacademy.moviereview.api.model.dto.RatedMovieDto;
import lt.codeacademy.moviereview.api.model.entity.Movie;
import lt.codeacademy.moviereview.api.model.entity.Review;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class RatedMovieDtoMapper {

    public RatedMovieDto mapToDto(Movie movie) {
        return RatedMovieDto.builder()
                .movieId(movie.getId())
                .title(movie.getTitle())
                .description(movie.getDescription())
                .cast(movie.getCast())
                .releaseYear(movie.getReleaseDate())
                .averageRating(
                        BigDecimal.valueOf(
                            movie.getReviews().stream()
                                .map(Review::getRating)
                                .mapToDouble(d -> d)
                                .average()
                                .orElse(0.0)
                ))
                .build();
    }
}
