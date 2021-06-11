package lt.codeacademy.moviereview.api.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.UUID;

@Builder
@Getter
public class ReviewDto {
    private final UUID reviewId;
    private final UUID movieId;
    private final String movieTitle;
    private final String username;
    private final Date reviewDate;
    private final Integer rating;
    private final String content;

}
