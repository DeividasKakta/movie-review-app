package lt.codeacademy.moviereview.api.utils.mapper;

import lt.codeacademy.moviereview.api.model.dto.ReviewDto;
import lt.codeacademy.moviereview.api.model.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewDtoMapper {

    public ReviewDto mapToDto(Review review) {
        return ReviewDto.builder()
                .reviewId(review.getId())
                .movieId(review.getMovie().getId())
                .movieTitle(review.getMovie().getTitle())
                .reviewDate(review.getDate())
                .username(review.getUser().getUsername())
                .content(review.getContent())
                .rating(review.getRating())
                .build();
    }
}
