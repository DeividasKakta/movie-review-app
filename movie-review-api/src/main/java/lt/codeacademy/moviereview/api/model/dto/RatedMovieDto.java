package lt.codeacademy.moviereview.api.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.UUID;

@Builder
@Getter
public class RatedMovieDto {
    private final UUID movieId;
    private final String title;
    private final String description;
    private final String picture;
    private final String cast;
    private final Date releaseDate;
    private final java.util.Date creationDate;
    private final BigDecimal averageRating;

}
